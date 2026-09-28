# Task Manager API

REST API for managing tasks with JWT authentication. Built with Node.js, Express and MongoDB (Mongoose).

## Features
- User registration and login with hashed passwords (bcrypt)
- JWT access and refresh tokens, sent via cookies or Bearer header
- Protected task routes (auth middleware)
- Task CRUD: each user can only see, update and delete their own tasks

## Tech Stack
Node.js, Express, MongoDB Atlas, Mongoose, JWT, bcryptjs, cookie-parser, cors

## Setup
1. Clone the repo and run `npm install`
2. Copy `.env.example` to `.env` and fill in your values
3. Run `npm run dev` (server starts on port 8000)

## API Endpoints
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | /api/v1/users/register | No | Register a new user |
| POST | /api/v1/users/login | No | Login, returns access token |
| POST | /api/v1/tasks | Yes | Create a task |
| GET | /api/v1/tasks | Yes | Get all tasks of the logged-in user |
| PUT | /api/v1/tasks/:id | Yes | Update a task |
| DELETE | /api/v1/tasks/:id | Yes | Delete a task |

## Task Status
`pending`, `in-progress`, `done`

## Author
Golu Sen