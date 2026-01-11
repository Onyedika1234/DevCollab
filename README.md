# DevCollab 🚀

## Overview

DevCollab is a high-performance backend API designed for developer collaboration, featuring robust content management and social networking capabilities. Built with Node.js and Express, the system utilizes Prisma ORM for type-safe database interactions with MySQL and integrates Redis for optimized data retrieval and caching.

## Features

- Node.js & Express: RESTful API architecture with modular routing.
- Prisma ORM: Schema management and type-safe queries for MySQL.
- Redis Caching: Strategic caching for user profiles and post feeds to reduce database load.
- Authentication: Secure session management via JWT and HTTP-only cookies.
- Rate Limiting: Global and route-specific protection against brute-force attacks.
- Idempotency: Implementation of idempotency keys to ensure request safety and prevent duplicate operations.
- Data Transfer Objects (DTO): Structured data normalization for both requests and responses.

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Onyedika1234/DevCollab.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the database and environment variables (see below).
4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

### Environment Variables

Create a `.env` file in the root directory and provide the following:

```env
PORT=3000
DATABASE_URL="mysql://user:password@localhost:3306/devcollab"
JWT_SECRET="your_secure_secret_key"
JWT_EXPIRES_IN="7d"
```

## API Documentation

### Base URL

`http://localhost:3000`

### Endpoints

#### POST /auth/signup

**Request**:

```json
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "bio": "Backend Engineer",
  "idempotencyId": "unique-uuid-v4"
}
```

**Response**:

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1...",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "username": "@johndoe"
  }
}
```

**Errors**:

- 400: Email or Username already exists
- 422: Validation error (all inputs must be strings)

#### POST /auth/login

**Request**:

```json
{
  "email": "john@example.com",
  "password": "password123"
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
- 400: Invalid Credentials

#### POST /auth/logout

**Request**:
`None (Requires Authentication Cookie)`
**Response**:
`204 No Content`

#### GET /user

**Request**:
`None (Requires Authentication Cookie)`
**Response**:

```json
{
  "success": true,
  "profile": {
    "id": "uuid",
    "name": "John Doe",
    "posts": [],
    "followers": [],
    "following": []
  }
}
```

#### GET /user/:targetId

**Request**:
`URL Parameter: targetId`
**Response**:
`User profile object including posts and follower counts`

#### PATCH /user

**Request**:

```json
{
  "bio": "Updated bio content"
}
```

**Response**:
`Updated user profile object`

#### POST /user/follow

**Request**:

```json
{
  "targetId": "uuid-of-user-to-follow",
  "idempotencyId": "unique-key"
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
  "targetId": "uuid-of-user-to-unfollow"
}
```

**Response**:
`204 No Content`

#### POST /posts

**Request**:

```json
{
  "title": "Scaling Node.js APIs",
  "content": "Full article content here...",
  "tags": ["nodejs", "scaling"],
  "language": "Javascript",
  "idempotencyId": "unique-post-id"
}
```

**Response**:

```json
{
  "success": true,
  "post": { "id": "uuid", "title": "Scaling Node.js APIs" }
}
```

#### GET /posts

**Request**:
`Query Param: ?filter=javascript (Optional)`
**Response**:

```json
{
  "posts": [
    {
      "id": "uuid",
      "title": "Title",
      "author": { "name": "Author Name" },
      "likes": [],
      "comment": []
    }
  ]
}
```

#### GET /posts/:postId

**Request**:
`URL Parameter: postId`
**Response**:
`Post object with likes count and comments`

#### PATCH /posts/:postId/like

**Request**:
`URL Parameter: postId`
**Response**:
`200 OK - Liked`

#### PATCH /posts/:postId/unlike

**Request**:
`URL Parameter: likeId`
**Response**:
`240 No Content`

#### POST /posts/:postId/comment

**Request**:

```json
{
  "content": "Great article!",
  "idempotencyId": "unique-comment-id"
}
```

**Response**:
`Created comment object`

#### GET /posts/:postId/comments

**Request**:
`URL Parameter: postId`
**Response**:
`Array of comments with author details`

## Technologies Used

| Technology   | Purpose                     |
| :----------- | :-------------------------- |
| **Node.js**  | Runtime Environment         |
| **Express**  | Web Framework               |
| **Prisma**   | ORM & Database Management   |
| **MySQL**    | Primary Relational Database |
| **Redis**    | In-memory Data Caching      |
| **JWT**      | Secure Authentication       |
| **BcryptJS** | Password Hashing            |

## Contributing

- 🤝 Fork the repository.
- 🌿 Create a feature branch: `git checkout -b feature/AmazingFeature`.
- 💾 Commit your changes: `git commit -m 'Add some AmazingFeature'`.
- 🚀 Push to the branch: `git push origin feature/AmazingFeature`.
- ✉️ Open a Pull Request.

## Author Info

- **GitHub**: [Onyedika1234](https://github.com/Onyedika1234)
- **LinkedIn**: [Nnagbo Onyedika Emmanuel](https://www.linkedin.com/in/onyedika-nnagbo-772095341/)
- **Twitter**: [@OnyedikaN59023](https://x.com/OnyedikaN59023)

---

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
