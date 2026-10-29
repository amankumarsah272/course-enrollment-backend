# Course Enrollment System - Backend

A backend REST API for managing courses and student enrollments, built using NestJS, TypeScript, Prisma ORM, and PostgreSQL.

## Live URLs

- **Frontend:** https://course-enrollment-frontend-tau.vercel.app/
- **Backend:** https://course-enrollment-backend-mg4b.onrender.com
- **GitHub Repository:** https://github.com/amankumarsah272/course-enrollment-backend

## Tech Stack

- NestJS and TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Role-Based Access Control
- bcrypt password hashing

## Features

- User authentication using email and password
- JWT-based protected routes
- Admin and Student roles
- Create, view, delete, and update course status
- View available courses
- Student course enrollment
- View enrolled courses
- Prevent duplicate course enrollments
- PostgreSQL database with Prisma migrations

## API Endpoints

| Method | Endpoint | Access |
|---|---|---|
| POST | `/auth/login` | Public |
| GET | `/courses` | Authenticated |
| POST | `/courses` | Admin |
| DELETE | `/courses/:id` | Admin |
| PATCH | `/courses/:id/status` | Admin |
| POST | `/enrollments` | Student |
| GET | `/enrollments/my` | Student |

## Demo Login Credentials

### Admin
- Email: `admin@example.com`
- Password: `Admin@123`

### Student
- Email: `student@example.com`
- Password: `Student@123`

These accounts are intended for assignment demonstration.

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

Create a `.env` file with your database connection string and JWT secret. Keep this file private.

Generate the Prisma client and apply migrations:

```bash
npx prisma generate
npx prisma migrate deploy
```

Start the development server:

```bash
npm run start:dev
```

The backend runs on `http://localhost:3001`.

## Database

PostgreSQL stores user, course, and enrollment data. Prisma manages database access and migrations.

## Security

- Passwords are hashed before storage.
- JWT authentication protects restricted endpoints.
- Role-based access controls Admin and Student permissions.
- Secrets and database credentials must not be committed to GitHub.

## Author

Course Enrollment System assignment project.
