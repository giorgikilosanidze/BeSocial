# BeSocial

BeSocial is a full-stack social networking app built with React + TypeScript on the frontend and Express + MongoDB on the backend.

This repository is a monorepo with:
- `client/` (Vite React app)
- `server/` (Express API + Socket.IO)

## Current Capabilities

- Cookie-based authentication with access/refresh JWTs
- Signup, login, logout, and session restore (`/api/auth/me`)
- Token refresh flow (`/api/auth/refreshToken`)
- Protected routes on both client and server
- Post feed with create, edit, delete, and single-post page
- Image upload for posts (up to 5 images, JPEG/PNG, 5MB each)
- Reactions (`like`, `love`, `angry`) with toggle/switch behavior
- Comments on posts
- User profiles with user-specific posts
- Profile picture and cover photo upload
- Follow/unfollow users
- User search (`/api/search`)
- Notifications (latest + all + mark as read)
- Real-time updates via Socket.IO for posts, reactions, comments, follows, and notifications

## Tech Stack

### Frontend (`client`)
- React 19
- TypeScript
- Vite
- Redux Toolkit + React Redux
- React Router DOM
- Tailwind CSS
- Socket.IO Client

### Backend (`server`)
- Node.js
- Express 5
- TypeScript
- MongoDB + Mongoose
- Socket.IO
- JWT + bcrypt
- Multer (uploads)
- Helmet, CORS, cookie-parser
- Zod validation

## Project Structure

```text
BeSocial/
|-- client/
|   |-- src/
|   |   |-- api/
|   |   |-- components/
|   |   |-- config/
|   |   |-- constants/
|   |   |-- features/          # Redux slices + thunks
|   |   |-- guards/
|   |   |-- hooks/
|   |   |-- pages/
|   |   |-- schemas/
|   |   |-- skeletons/
|   |   |-- svg/
|   |   |-- types/
|   |   |-- utils/
|   |   |-- App.tsx
|   |   `-- main.tsx
|   |-- package.json
|   `-- vite.config.ts
|-- server/
|   |-- src/
|   |   |-- middlewares/
|   |   |-- modules/
|   |   |   |-- auth/
|   |   |   |-- comment/
|   |   |   |-- feed/
|   |   |   |-- notification/
|   |   |   |-- post/
|   |   |   |-- profile/
|   |   |   |-- reactions/
|   |   |   `-- user/
|   |   |-- app.ts
|   |   |-- server.ts
|   |   `-- socket.ts
|   |-- images/                # uploaded files
|   `-- package.json
|-- package.json               # root scripts for both apps
`-- README.md
```

## Environment Variables

### Server (`server/.env`)

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/besocial
CLIENT_URL=http://localhost:5173
JWT_SECRET_KEY=your_access_token_secret
JWT_REFRESH_SECRET_KEY=your_refresh_token_secret
NODE_ENV=development
```

### Client (`client/.env`)

```env
VITE_SERVER_URL=http://localhost:3000
```

## Installation

```bash
# from repo root
npm install
npm --prefix client install
npm --prefix server install
```

## Running the App

From the repo root:

```bash
npm run dev
```

This starts both apps:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

### Useful Scripts

Root (`package.json`):
- `npm run dev` - run frontend + backend together
- `npm run dev:client` - run client only
- `npm run dev:server` - run server only

Client (`client/package.json`):
- `npm --prefix client run dev`
- `npm --prefix client run build`
- `npm --prefix client run lint`
- `npm --prefix client run preview`

Server (`server/package.json`):
- `npm --prefix server run dev`
- `npm --prefix server run build`
- `npm --prefix server run start`

## API Overview

Base URL (local): `http://localhost:3000`

### Auth (`/api/auth`)
- `POST /signup`
- `POST /login`
- `GET /me` (auth required)
- `POST /refreshToken`
- `POST /logout`

### Feed (`/api/feed`)
- `GET /posts` (auth required)
- `GET /posts/:postId` (auth required)
- `POST /posts` (auth required, multipart/form-data)
- `PATCH /posts/:postId` (auth required, owner only)
- `DELETE /posts/:postId` (auth required, owner only)
- `POST /reaction` (auth required)
- `POST /comment` (auth required)

### Profile (`/api/profile`)
- `GET /user/:userId` (auth required)
- `POST /profilePicture/:userId` (auth required)
- `POST /coverPhoto/:userId` (auth required)
- `POST /follow` (auth required)

### Notifications (`/api`)
- `GET /notifications` (auth required, latest 5)
- `GET /notifications/all` (auth required)
- `PATCH /notifications/:notificationId/read` (auth required)

### Search (`/api`)
- `GET /search?search=<query>`

## Real-Time Events (Socket.IO)

Server emits:
- `newPost`
- `postEdited`
- `postDeleted`
- `reactionAdded`
- `commentAdded`
- `followedOrUnfollowed`
- `followNotification` (to target user room)
- `reactionNotification` (to post author room)

Client joins socket room by `userId` after login/session restore.

## Uploads and Static Files

- Uploaded images are stored in `server/images/`
- Static image serving path: `/images/*`
- Accepted MIME types: `image/png`, `image/jpeg`
- Post upload limit: up to 5 files, each max 5MB

## Security Notes

- JWTs are stored in HTTP-only cookies (`access_token`, `refresh_token`)
- Access token expiry: 1 hour
- Refresh token expiry: 7 days
- CORS is configured with credentials and `CLIENT_URL`
- `helmet` is enabled

## Testing

There is currently no automated test suite configured in this repository.

## License

ISC
