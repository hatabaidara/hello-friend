# Hello Friend Backend

Spring Boot backend for a political social site.

## Prerequisites

- Java 17
- Maven
- MySQL running locally

## Configuration

Edit `src/main/resources/application.properties` and set:

- `spring.datasource.url`
- `spring.datasource.username`
- `spring.datasource.password`

Create database `hello_friend` in MySQL.

## Run

```bash
mvn spring-boot:run
```

## Auth

- Register via `POST /api/members/register`
- Use HTTP Basic with email + password on protected endpoints
- Roles: `ADMIN`, `MEMBRE`

## Endpoints

- Members
  - `POST /api/members/register`
  - `GET /api/members`
  - `GET /api/members/{email}`
- Partners
  - `POST /api/partners` (ADMIN)
  - `GET /api/partners`
- News
  - `POST /api/news` (ADMIN)
  - `GET /api/news`
