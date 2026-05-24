# BeSocial

A social networking app — post stuff, follow people, react, comment, chat in real time.

## What it does

- Signup / login with JWT cookies
- Create, edit, delete posts (with up to 5 images)
- Like / love / angry reactions on posts
- Comments
- User profiles with profile picture and cover photo (upload + delete)
- Follow / unfollow other users
- Real-time chat with online status, typing presence, seen receipts, emojis
- Notifications (follows, reactions, comments, etc.)
- User search

## Stack

**Frontend:** React 19, TypeScript, Vite, Redux Toolkit, React Router, Tailwind, Socket.IO client
**Backend:** Node, Express 5, TypeScript, MongoDB + Mongoose, Socket.IO, JWT, Multer
**Image hosting:** Cloudinary

## Getting started

1. Clone the repo.
2. Install everything:
    ```bash
    npm install
    npm --prefix client install
    npm --prefix server install
    ```
3. Create `server/.env`:
    ```env
    PORT=3000
    MONGODB_URI=your_mongo_connection_string
    CLIENT_URL=http://localhost:5173
    JWT_SECRET_KEY=any_long_random_string
    JWT_REFRESH_SECRET_KEY=another_long_random_string
    NODE_ENV=development
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```
4. Create `client/.env`:
    ```env
    VITE_SERVER_URL=http://localhost:3000
    ```
5. Run both apps from the repo root:
    ```bash
    npm run dev
    ```

Client runs on `http://localhost:5173`, server on `http://localhost:3000`.

You'll need a free [Cloudinary](https://cloudinary.com) account for image uploads and a MongoDB database (Atlas free tier works fine).

## Seeding dummy data (optional)

The deployed version already has 8 dummy users with posts pre-seeded.

If you're running locally and want the same demo data in your own database, add `SEED_PASSWORD=somePassword` to `server/.env` and run:

```bash
cd server
npx tsx src/scripts/seedDummyData.ts
```

That creates 8 users (`<username>@example.com`) all sharing the password you set in `SEED_PASSWORD`, each with 1–3 posts.
