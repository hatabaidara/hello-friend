Render deployment checklist (enterprise)

1) Frontend (Static site)
- Root directory: set to the folder containing package.json you want to build (root or hello-friend/hello-friend)
- Build command: npm ci && npm run build
- Publish directory: dist
- Build environment variables (Render > Environment):
  - VITE_API_BASE_URL = https://<your-backend-url>

Optional runtime replacement method (no rebuild needed): set API_BASE_URL in Render environment and add to Build command:
  npm ci && npm run build && sed -i "s|__API_BASE_URL__|$API_BASE_URL|g" dist/index.html

2) Backend (Web service)
- Use Docker deployment (recommended) or JAR deployment.
- If Docker: point Render to the `hello-friend-backend/Dockerfile`.
- If JAR: Build command: mvn -f hello-friend-backend/pom.xml clean package -DskipTests
  Start command: java -jar hello-friend-backend/target/hello-friend-backend-0.0.1-SNAPSHOT.jar
- Environment variables (important):
  - SPRING_DATASOURCE_URL
  - SPRING_DATASOURCE_USERNAME
  - SPRING_DATASOURCE_PASSWORD
  - Optional: SPRING_PROFILES_ACTIVE=prod

3) Health checks
- Backend health endpoint: /actuator/health (enabled by Spring Actuator)
- Frontend: root should serve index.html (no special health)

4) Security
- Do not place secrets in index.html
- Use Render secrets (Environment variables) for DB credentials, API keys, etc.

5) CI/CD (GitHub Actions example)
- A sample workflow is included in .github/workflows/ci-cd.yml to build backend, push Docker image to GHCR and build frontend.


