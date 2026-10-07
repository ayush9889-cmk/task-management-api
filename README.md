# Task Management API

A simple Task Management REST API built using Node.js, Express.js and MongoDB.

## Tech Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv

## Features

- User Register
- User Login
- JWT Authentication
- User Profile
- User Logout
- Create Task
- Get Tasks
- Get Single Task
- Update Task
- Delete Task
- Search Tasks
- Filter by Status and Priority
- Pagination
- Validation

## Project Setup

Clone the project and install the packages:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

Start the server:

```bash
npm run dev
```

The server will run on:

```text
http://localhost:5000
```

## API Routes

### Auth

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
POST /api/auth/logout
```

### Tasks

```text
POST   /api/tasks
GET    /api/tasks
GET    /api/tasks/:id
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

## Authentication

For protected routes, send the JWT token in the Authorization header:

```text
Authorization: Bearer YOUR_TOKEN
```

## Create Task

Example request:

```json
{
  "title": "Complete Backend Assignment",
  "description": "Build Task Management API",
  "status": "In Progress",
  "priority": "High",
  "dueDate": "2026-10-10"
}
```

Status can be:

```text
Pending
In Progress
Completed
```

Priority can be:

```text
Low
Medium
High
```

## Search, Filter and Pagination

Search:

```text
GET /api/tasks?search=backend
```

Filter:

```text
GET /api/tasks?status=Completed
GET /api/tasks?priority=High
```

Pagination:

```text
GET /api/tasks?page=1&limit=10
```

## Error Handling

The API returns proper error responses for:

- Missing required fields
- Invalid status or priority
- Invalid task ID
- Invalid or expired token
- Task not found
- Unauthorized requests

## Testing

I tested the APIs using Thunder Client/Postman.

## Author

Ayush Singh
