# Enterprise-grade multi-stage Dockerfile for backend
# - builds with Maven image
# - caches dependencies where possible
# - produces minimal runtime image with non-root user
# - healthcheck and JVM tuning via env

# Build args with sensible defaults
ARG MAVEN_IMAGE=maven:3.9.6-eclipse-temurin-17
ARG RUNTIME_IMAGE=eclipse-temurin:17-jre-jammy

# --- Stage 1: builder ---
FROM ${MAVEN_IMAGE} AS builder

WORKDIR /workspace

# copy mvnw and .mvn if present to support projects using the wrapper
# copy pom first to take advantage of layer caching for dependencies
COPY pom.xml mvnw* ./
COPY .mvn/ .mvn/ || true

# Pre-resolve dependencies to leverage cache
RUN mvn -B -DskipTests dependency:go-offline || true

# Copy the rest of the project
COPY src/ ./src/
COPY hello-friend-backend/pom.xml ./hello-friend-backend-pom.xml || true
COPY ./.mvn ./.mvn || true
COPY . .

# Build the application artifact
RUN mvn -B -DskipTests package -T1C

# --- Stage 2: runtime ---
FROM ${RUNTIME_IMAGE} AS runtime

# Default runtime env (can be overridden)
ENV SERVER_PORT=8081
ENV JVM_OPTS="-Xms256m -Xmx512m -XX:+UseG1GC -XX:+HeapDumpOnOutOfMemoryError"

# Install minimal tools for healthchecks (kept small)
USER root
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser

WORKDIR /app

# Copy the jar from builder stage (support wildcard)
COPY --from=builder /workspace/target/*-SNAPSHOT.jar /app/app.jar
COPY --from=builder /workspace/target/*.jar /app/app.jar

# Ensure permissions
RUN chown -R appuser:appuser /app && chmod 644 /app/app.jar

# Switch to non-root
USER appuser

# OCI labels
LABEL org.opencontainers.image.title="hello-friend-backend" \
      org.opencontainers.image.description="Backend service for Hello Friend" \
      org.opencontainers.image.version="0.0.1" \
      org.opencontainers.image.authors="Equipe Hello Friend"

EXPOSE ${SERVER_PORT}

# Use exec form to ensure proper signal forwarding
ENTRYPOINT ["sh", "-c", "exec java $JVM_OPTS -Dserver.port=$SERVER_PORT -jar /app/app.jar"]

# Healthcheck (uses the server port env)
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -fsS http://127.0.0.1:${SERVER_PORT}/actuator/health || exit 1
