# Course Enrollment System — Backend

A RESTful backend API for a Course Enrollment System built with NestJS, TypeScript, Prisma ORM, and PostgreSQL.

## Live URLs

- **Backend API:** https://course-enrollment-backend-mg4b.onrender.com
- **Frontend Application:** https://course-enrollment-frontend-tau.vercel.app/
- **GitHub Repository:** https://github.com/amankumarsah272/course-enrollment-backend

## Tech Stack

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Role-Based Authorization
- REST APIs

## Features

- User authentication using JWT
- Role-based access for Admin and Student
- Course creation and management
- Update course status
- Retrieve available courses
- Server-side course pagination
- Configurable page number and page size
- Limit validation for pagination requests
- Student course enrollment
- Prevent duplicate enrollments
- Retrieve a student's enrolled courses
- PostgreSQL database integration using Prisma

## Pagination

The courses endpoint supports server-side pagination using query parameters.

**Endpoint:**

`GET /courses?page=1&limit=6`

| Parameter | Description |
|---|---|
| `page` | Page number, starting from 1 |
| `limit` | Number of courses per page; defaults to 6 |

The API response includes the courses for the requested page and pagination metadata, including total courses, total pages, and next/previous page availability.

## API Endpoints

### Authentication
- `POST /auth/login` — Authenticate a user and obtain a JWT.

### Courses
- `GET /courses?page=1&limit=6` — Retrieve paginated courses.
- `POST /courses` — Create a course (Admin).
- `PATCH /courses/:id/status` — Update course status (Admin).
- `DELETE /courses/:id` — Delete a course (Admin).

### Enrollments
- `POST /enrollments` — Enroll in a course.
- `GET /enrollments/my` — Retrieve the logged-in student's enrollments.

Protected endpoints require a valid JWT. Access depends on the user's role.

## Run Locally

### Prerequisites
- Node.js and npm
- PostgreSQL database

### Installation

```bash
git clone https://github.com/amankumarsah272/course-enrollment-backend.git
cd course-enrollment-backend
npm install
```

Create a `.env` file with the database connection and JWT secret required by the application:

```env
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_jwt_secret"
```

Configure Prisma and apply the database migrations according to the project's Prisma setup.

### Start the application

```bash
npm run start:dev
```

The backend runs locally on port `3001` with the current project configuration.

## Deployment

The backend is deployed on Render and uses a PostgreSQL database hosted on Neon.

## Author

Course Enrollment System assignment project.