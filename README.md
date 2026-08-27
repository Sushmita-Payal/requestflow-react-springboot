# RequestFlow – Service Request Management System

RequestFlow is a simple full-stack application for creating, tracking, and resolving employee support requests. It demonstrates a clean React-to-Spring Boot integration using REST APIs and is designed as an easy-to-explain portfolio project for Java full-stack roles.

## Tech stack

### Frontend

- React 19
- JavaScript
- Vite
- CSS3
- Fetch API

### Backend

- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Bean Validation
- H2 Database
- Maven
- JUnit and Mockito

## Architecture

```text
React frontend
      |
      | JSON over REST
      v
Spring Boot Controller
      |
      v
Service Layer
      |
      v
Spring Data JPA Repository
      |
      v
H2 Database
```

## Features

- Create a service request with requester, category, and priority
- View all requests in a responsive dashboard
- Search by request title or requester name
- Filter requests by status
- Move requests through Open, In Progress, and Resolved states
- Display live dashboard counts by status
- Validate incoming API requests
- Return consistent API error responses
- Load sample data automatically for demonstration

## Project structure

```text
requestflow-react-springboot/
├── frontend/                    React application
├── backend/                     Spring Boot application
├── .gitignore
└── README.md
```

## REST API

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/tickets` | Retrieve every request |
| `GET` | `/api/tickets?status=OPEN` | Filter requests by status |
| `POST` | `/api/tickets` | Create a new request |
| `PATCH` | `/api/tickets/{id}/status` | Update request status |

### Create request example

```json
{
  "title": "Unable to access billing portal",
  "category": "Access",
  "requester": "Ananya Rao",
  "priority": "HIGH"
}
```

### Update status example

```json
{
  "status": "IN_PROGRESS"
}
```

## Run locally

### Prerequisites

- Java 17+
- Maven 3.9+
- Node.js 20+
- npm

### Start the backend

```bash
cd backend
mvn spring-boot:run
```

The backend starts at `http://localhost:8080`.

### Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser. Vite proxies `/api` requests to the Spring Boot application.

## Database

The project uses an in-memory H2 database so it can run without installing a separate database.

H2 console:

```text
URL:      http://localhost:8080/h2-console
JDBC URL: jdbc:h2:mem:requestflow
Username: sa
Password: leave blank
```

## Run tests

```bash
cd backend
mvn test
```

## Resume description

**RequestFlow – Service Request Management System**

- Built a full-stack service request management application using React, Java 17, Spring Boot, and REST APIs.
- Implemented layered backend architecture with controller, service, and repository components using Spring Data JPA and H2.
- Added request creation, search, status filtering, workflow updates, validation, exception handling, responsive UI, and unit testing.

## Interview explanation

> RequestFlow helps a support team manage employee service requests. React provides the user interface and communicates with Spring Boot using REST APIs and JSON. Spring Boot processes requests through controller, service, and repository layers, while Spring Data JPA stores the data in H2. I also implemented validation, centralized exception handling, status filtering, and unit testing.

## Future improvements

- Add Spring Security and JWT authentication
- Replace H2 with PostgreSQL
- Add role-based access for employees and support engineers
- Add pagination and sorting
- Add Docker Compose and CI/CD deployment
