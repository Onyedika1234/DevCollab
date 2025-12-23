# DevCollab API

## Overview

DevCollab is a high-performance backend infrastructure designed for developer collaboration. Built with Node.js and Express, the system leverages Prisma ORM for type-safe MySQL interactions and Redis for optimized data retrieval through server-side caching.

## Features

- Node.js & Express: Core server-side framework
- Prisma ORM: Database modeling and migration management
- Redis: Caching layer for posts and user profiles to reduce database load
- JWT & Cookie-Parser: Secure, stateless authentication using HTTP-only cookies
- Express Rate Limit: Protection against brute-force attacks on sensitive routes
- Helmet & CORS: Production-grade security headers and cross-origin resource sharing
- Idempotency Support: Prevention of duplicate actions for critical operations like registration and comments

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Onyedika1234/DevCollab.git
   ```
2. Navigate to the project directory:
   ```bash
   cd DevCollab
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

### Environment Variables

Create a `.env` file in the root directory and include the following:

```env
PORT=5000
DATABASE_URL="mysql://user:password@localhost:3306/devcollab"
JWT_SECRET="your_secure_random_secret"
JWT_EXPIRES_IN="7d"
```

## API Documentation

### Base URL

`http://localhost:5000`

### Endpoints

#### POST /auth/signup

**Request**:

```json
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123",
  "bio": "Full-stack developer looking for collaborators",
  "idempotencyId": "unique-request-uuid"
}
```

**Response**:

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5...",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "username": "johndoe"
  }
}
```

**Errors**:

- 400: Email or Username already exists
- 422: Validation error (all fields must be strings)

#### POST /auth/login

**Request**:

```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response**:

```json
{
  "success": true,
  "message": "Logged in successfully"
}
```

**Errors**:

- 404: User not found
- 400: Invalid credentials

#### POST /auth/logout

**Request**:
`No payload required (Clears auth cookies)`

**Response**:
`Status 204 No Content`

#### GET /user

**Request**:
`Authenticated Request (Cookie: token)`

**Response**:

```json
{
  "success": true,
  "profile": {
    "id": "uuid",
    "name": "John Doe",
    "followers": [],
    "following": []
  }
}
```

#### PATCH /user

**Request**:

```json
{
  "bio": "Updated developer bio"
}
```

**Response**:

```json
{
  "success": true,
  "updated": {
    "name": "John Doe",
    "bio": "Updated developer bio"
  }
}
```

#### POST /user/follow

**Request**:

```json
{
  "targetId": "user-uuid-to-follow"
}
```

**Response**:

```json
{
  "success": true,
  "message": "User followed Successfully"
}
```

#### DELETE /user/unfollow

**Request**:

```json
{
  "targetId": "user-uuid-to-unfollow"
}
```

**Response**:
`Status 204 No Content`

#### POST /posts

**Request**:

```json
{
  "title": "Scaling Node.js",
  "content": "Detailed article content...",
  "tags": ["nodejs", "backend"],
  "language": "javascript",
  "idempotencyId": "unique-post-uuid"
}
```

**Response**:

```json
{
  "success": true,
  "message": "Post created Successfully",
  "post": { "id": "uuid", "title": "Scaling Node.js" }
}
```

#### GET /posts

**Request**:
`No payload required`

**Response**:

```json
[
  {
    "id": "uuid",
    "title": "Scaling Node.js",
    "author": { "name": "John Doe" },
    "likes": [],
    "comments": []
  }
]
```

#### GET /posts/:postId

**Request**:
`Path Parameter: postId`

**Response**:

```json
{
  "success": true,
  "post": {
    "id": "uuid",
    "title": "Scaling Node.js",
    "totalLikes": 5
  }
}
```

#### PATCH /posts/:postId/like

**Request**:
`Path Parameter: postId`

**Response**:

```json
{
  "success": true,
  "message": "Liked."
}
```

#### POST /posts/:postId/comment

**Request**:

```json
{
  "content": "This is a great post!",
  "idempotencyId": "unique-comment-uuid"
}
```

**Response**:

```json
{
  "success": true,
  "comment": {
    "id": "uuid",
    "content": "This is a great post!"
  }
}
```

## Technologies Used

| Technology                        | Purpose                     |
| :-------------------------------- | :-------------------------- |
| [Node.js](https://nodejs.org/)    | Runtime Environment         |
| [Express](https://expressjs.com/) | Web Framework               |
| [Prisma](https://www.prisma.io/)  | ORM for Database Management |
| [MySQL](https://www.mysql.com/)   | Relational Database         |
| [Redis](https://redis.io/)        | Caching and Performance     |
| [JWT](https://jwt.io/)            | Secure Authentication       |

## Contributing

- Fork the project and create a new branch.
- Ensure all logic includes appropriate validation middleware.
- Maintain the idempotency pattern for new write operations.
- Submit a pull request with a detailed summary of changes.

## Author Info

- **GitHub**: [Onyedika1234](https://github.com/Onyedika1234)
- **LinkedIn**: [Nnagbo Onyedika Emmanuel](https://www.linkedin.com/in/onyedika-nnagbo-772095341/)
- **Twitter**: [AlexCode](https://x.com/OnyedikaN59023)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
