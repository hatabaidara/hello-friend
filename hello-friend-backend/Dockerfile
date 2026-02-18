# --- Stage 1: build (Maven + JDK) ---
ARG MAVEN_IMAGE=maven:3.9.6-eclipse-temurin-17
FROM ${MAVEN_IMAGE} AS builder

WORKDIR /workspace

# Copy only the files needed to download dependencies first to leverage Docker cache
COPY pom.xml mvnw* ./
COPY .mvn .mvn

# Pre-resolve dependencies into the local repository (cache-friendly)
RUN mvn -B -DskipTests dependency:go-offline || true

# Copy source and build
COPY src ./src
COPY pom.xml ./

# Build artifact (skip tests by default, override in CI if needed)
RUN mvn -B -DskipTests package -T1C

# --- Stage 2: runtime (minimal JRE) ---
ARG RUNTIME_IMAGE=eclipse-temurin:17-jre-jammy
FROM ${RUNTIME_IMAGE} AS runtime

# Default runtime environment variables (can be overridden at runtime)
ENV PORT=8080
ENV JVM_OPTS="-Xms256m -Xmx512m"

# Install curl for healthchecks (small trade-off for observability)
USER root
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Create a non-root user for security
RUN groupadd -r appuser && useradd -r -g appuser appuser

WORKDIR /app

# Copy the built artifact from the builder stage
# We copy any jar produced into a deterministic name
COPY --from=builder /workspace/target/*.jar /app/app.jar

# Ensure correct permissions
RUN chown -R appuser:appuser /app

# Use non-root user
USER appuser

# Labels (OCI) for metadata
LABEL org.opencontainers.image.title="hello-friend-backend" \
      org.opencontainers.image.description="Backend service for Hello Friend" \
      org.opencontainers.image.version="0.1.0" \
      org.opencontainers.image.authors="Equipe Hello Friend"

# Expose service port
EXPOSE ${PORT}

# Entrypoint (keeps PID 1 reaped correctly with 'exec')
ENTRYPOINT ["sh", "-c", "exec java $JVM_OPTS -jar /app/app.jar"]

# Simple HTTP healthcheck (adjust endpoint to your app - e.g. /actuator/health)
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -f http://127.0.0.1:${PORT}/actuator/health || exit 1

