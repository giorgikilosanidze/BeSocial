# BeSocial 🌐

A modern, full-stack social networking platform built with React, TypeScript, Node.js, and MongoDB. BeSocial enables users to connect, share posts with photos, manage their profiles, and engage with a vibrant community.

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/giorgikilosanidze/BeSocial)

## 🌍 Live Demo

**Frontend (Vercel):** [https://be-social-liard.vercel.app](https://be-social-liard.vercel.app)  
**Backend API (Render):** [https://besocial-tu5e.onrender.com](https://besocial-tu5e.onrender.com)

> **Note:** The backend is hosted on Render's free tier, which may spin down after inactivity. Initial requests might take 30-60 seconds to wake up the server.

---

## 📋 Overview

BeSocial is a social networking application designed to bring people together through meaningful interactions. This portfolio project showcases modern web development practices, clean architecture, robust authentication, and a user-centric design approach.

### Current Status: 🚀 Live & Deployed - Core Features Implemented

The project is **live and deployed**! Core social networking features are fully functional, including authentication, posts, photo uploads, and user profiles. The application is hosted on Vercel (frontend) and Render (backend).

---

## ✨ Features

### ✅ Implemented Features

-   **Advanced User Authentication**
    -   User registration with email and password
    -   Secure password hashing using bcrypt
    -   JWT-based authentication with access and refresh tokens
    -   Automatic token refresh mechanism
    -   Protected routes with auth guards
    -   Permission-based access control
    -   Secure logout functionality
    -   Password visibility toggle for better UX
    -   Session persistence across page refreshes

-   **Social Posts & Feed**
    -   Create posts with text and/or images
    -   Upload up to 5 photos per post (5MB limit per image)
    -   Image preview before posting
    -   Edit existing posts (with edited indicator)
    -   Delete posts (with permission validation)
    -   Real-time feed updates
    -   Post timestamp with relative time display ("2 hours ago")
    -   Optimized image handling with multer
    -   Three-dot menu for post actions (edit/delete)
    -   Loading skeletons for better UX

-   **User Profiles**
    -   Dedicated profile pages for each user
    -   Profile header with cover photo and profile picture
    -   User information sections (Intro, Photos, Friends)
    -   Profile navigation tabs
    -   User-specific posts timeline
    -   Create posts from profile page
    -   Posts count display

-   **Modern UI Components**
    -   Responsive navigation bar with BeSocial branding
    -   Search bar (UI ready)
    -   Notification indicator
    -   Home, notifications, and messages icons
    -   User account dropdown menu
    -   Profile sidebar with user suggestions
    -   Comment system UI
    -   Mobile-responsive design with Tailwind CSS

### 🚀 Planned Features

-   **Social Interactions**
    -   Post reactions (like, love, etc.)
    -   Comments and replies functionality
    -   Share posts
    -   Follow/unfollow users
    -   Friend requests and management

-   **Real-time Features**
    -   One-on-one messaging
    -   Group conversations
    -   Live notifications
    -   Real-time feed updates

-   **Enhanced Profile Features**
    -   Profile and cover photo upload
    -   Edit profile information
    -   Bio and personal details
    -   Activity history

-   **Additional Features**
    -   Search functionality for users and posts
    -   Notifications system backend
    -   News feed algorithm
    -   Media gallery
    -   Deployment to production

---

## 🛠️ Tech Stack

### Frontend

-   **React 19** - Latest UI library for building interfaces
-   **TypeScript** - Type safety and enhanced developer experience
-   **Redux Toolkit** - Centralized state management with slices
-   **React Router v7** - Client-side routing and navigation
-   **Tailwind CSS** - Utility-first CSS framework for modern styling
-   **Vite 7** - Lightning-fast build tool and development server
-   **React Icons** - Comprehensive icon library
-   **React Spinners** - Loading state indicators

### Backend

-   **Node.js** - JavaScript runtime environment
-   **Express 5** - Fast, unopinionated web framework
-   **TypeScript** - Type-safe backend development
-   **MongoDB** - Document-based NoSQL database
-   **Mongoose** - Elegant MongoDB object modeling
-   **JWT (jsonwebtoken)** - Secure token-based authentication
-   **bcrypt** - Industry-standard password hashing
-   **Multer** - Middleware for handling multipart/form-data (file uploads)
-   **Helmet** - Security middleware for HTTP headers
-   **CORS** - Cross-origin resource sharing configuration
-   **Zod** - TypeScript-first schema validation
-   **cookie-parser** - Parse HTTP request cookies

### Development Tools

-   **ESLint** - Code quality and consistency
-   **Concurrently** - Run multiple npm scripts simultaneously
-   **tsx** - TypeScript execution environment for Node.js
-   **dotenv** - Environment variable management
-   **Autoprefixer** - PostCSS plugin for vendor prefixes

---

## 📁 Project Structure

```
BeSocial/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── assets/        # Static assets (images, fonts, etc.)
│   │   ├── components/    # Reusable UI components
│   │   │   ├── Navbar.tsx
│   │   │   ├── CreatePost.tsx
│   │   │   ├── PostCard.tsx
│   │   │   ├── PostSkeleton.tsx
│   │   │   ├── Comment.tsx
│   │   │   ├── CommentInput.tsx
│   │   │   ├── ProfileHeader.tsx
│   │   │   ├── ProfileTabs.tsx
│   │   │   ├── ProfileIntro.tsx
│   │   │   ├── ProfilePhotos.tsx
│   │   │   ├── ProfileFriends.tsx
│   │   │   ├── ProfileSidebar.tsx
│   │   │   └── SuggestionsSidebar.tsx
│   │   ├── config/        # App configuration and routes
│   │   ├── constants/     # Constant values and API URLs
│   │   ├── features/      # Redux slices and thunks
│   │   │   ├── auth/      # Authentication state management
│   │   │   ├── feed/      # Feed state management
│   │   │   └── profile/   # Profile state management
│   │   ├── guards/        # Route protection (AuthGuard)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   ├── Feed.tsx
│   │   │   ├── Profile.tsx
│   │   │   └── NotFound.tsx
│   │   ├── schemas/       # Validation schemas
│   │   ├── types/         # TypeScript type definitions
│   │   ├── utils/         # Utility functions
│   │   ├── App.tsx        # Main App component
│   │   ├── AppRoutes.tsx  # Route configuration
│   │   ├── main.tsx       # Application entry point
│   │   └── store.ts       # Redux store configuration
│   ├── public/            # Public static files
│   └── index.html         # HTML template

├── server/                # Backend Node.js application
│   ├── src/
│   │   ├── middlewares/   # Express middlewares
│   │   │   ├── authGuard/ # Authentication middleware
│   │   │   └── permissionGuard/ # Permission validation
│   │   ├── modules/       # Feature modules
│   │   │   ├── auth/      # Authentication module
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── auth.schema.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.types.ts
│   │   │   │   └── auth.validators.ts
│   │   │   ├── feed/      # Feed/Posts module
│   │   │   │   ├── feed.controller.ts
│   │   │   │   └── feed.routes.ts
│   │   │   ├── post/      # Post data model
│   │   │   │   ├── post.model.ts
│   │   │   │   ├── post.repository.ts
│   │   │   │   └── post.types.ts
│   │   │   ├── profile/   # Profile module
│   │   │   │   ├── profile.controller.ts
│   │   │   │   └── profile.routes.ts
│   │   │   └── user/      # User data model
│   │   │       ├── user.model.ts
│   │   │       ├── user.repository.ts
│   │   │       └── user.types.ts
│   │   ├── utils/         # Utility functions
│   │   ├── app.ts         # Express app configuration
│   │   └── server.ts      # Server entry point
│   ├── images/            # Uploaded images storage
│   └── .env               # Environment variables (not in git)

├── package.json           # Root package.json with scripts
└── README.md             # This file
```

---

## 🚀 Getting Started

### Prerequisites

-   **Node.js** (v18 or higher)
-   **npm** or **yarn**
-   **MongoDB** (local installation or MongoDB Atlas account)

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/giorgikilosanidze/BeSocial.git
    cd BeSocial
    ```

2. **Install dependencies**

    ```bash
    # Install root dependencies
    npm install

    # Install client dependencies
    cd client
    npm install

    # Install server dependencies
    cd ../server
    npm install
    cd ..
    ```

3. **Set up environment variables**

    Create a `.env` file in the `server` directory:

    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    REFRESH_TOKEN_SECRET=your_refresh_token_secret
    CLIENT_URL=http://localhost:5173
    ```

    Create a `.env` file in the `client` directory (if needed):

    ```env
    VITE_SERVER_URL=http://localhost:3000
    ```

4. **Run the development servers**

    From the root directory:

    ```bash
    npm run dev
    ```

    This will start both the frontend and backend servers concurrently:

    - Frontend: `http://localhost:5173`
    - Backend: `http://localhost:3000`

    Alternatively, you can run them separately:

    ```bash
    # Run frontend only
    npm run dev:client

    # Run backend only
    npm run dev:server
    ```

---

## 📚 API Documentation

### Authentication Endpoints

#### Register User

```http
POST /api/auth/signup
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

**Response**: Returns user data and sets httpOnly cookies with access and refresh tokens.

#### Get Current User

```http
GET /api/auth/me
```

**Headers**: Requires valid access token in cookies.

#### Refresh Access Token

```http
POST /api/auth/refreshToken
```

**Headers**: Requires valid refresh token in cookies.

#### Logout

```http
POST /api/auth/logout
```

Clears authentication cookies.

### Feed/Post Endpoints

#### Get All Posts

```http
GET /api/feed/posts
```

**Headers**: Requires authentication.

#### Create Post

```http
POST /api/feed/posts
Content-Type: multipart/form-data

{
  "text": "string (optional)",
  "image": "file[] (optional, max 5 images)"
}
```

**Headers**: Requires authentication.

#### Edit Post

```http
PATCH /api/feed/posts/:postId
Content-Type: application/json

{
  "text": "string"
}
```

**Headers**: Requires authentication and author permission.

#### Delete Post

```http
DELETE /api/feed/posts/:postId
```

**Headers**: Requires authentication and author permission.

### Profile Endpoints

#### Get User Profile

```http
GET /api/profile/user/:userId
```

**Headers**: Requires authentication.

---

## 🏗️ Architecture

BeSocial follows a modular, feature-based architecture with clear separation of concerns:

### Frontend Architecture

-   **Component-based design** with React 19
-   **Redux Toolkit** for centralized and type-safe state management
-   **Feature-based folder structure** for scalability and maintainability
-   **Custom hooks** for reusable logic (e.g., `useAppDispatch`, `useAppSelector`)
-   **Protected routes** with authentication guards
-   **Async thunks** for API interactions
-   **TypeScript** for complete type safety across the application

### Backend Architecture

-   **MVC pattern** with modular structure
-   **Service layer** for business logic separation
-   **Repository pattern** for database operations
-   **Middleware-based** request processing
-   **Validation layer** using Zod schemas
-   **Type-safe development** with TypeScript
-   **JWT authentication** with access and refresh token rotation
-   **Permission guards** for resource authorization
-   **File upload handling** with Multer middleware

---

## 🔒 Security Features

-   **Password hashing** with bcrypt (industry-standard)
-   **JWT tokens** stored in httpOnly cookies (prevents XSS attacks)
-   **Access and refresh token** rotation mechanism
-   **CORS configuration** for controlled cross-origin requests
-   **Helmet middleware** for secure HTTP headers
-   **Input validation** with Zod schemas
-   **Permission-based access control** for post operations
-   **File type and size validation** for uploads

---

## 🧪 Testing

_Testing setup is planned for future development_

---

## 🤝 Contributing

This is currently a personal portfolio project, but suggestions and feedback are welcome!

---

## 📝 License

This project is licensed under the ISC License.

---

## 👤 Author

**Giorgi Kilosanidze**

-   GitHub: [@giorgikilosanidze](https://github.com/giorgikilosanidze)
-   Repository: [BeSocial](https://github.com/giorgikilosanidze/BeSocial)

---

## 🎯 Project Goals

This project serves as a portfolio piece to demonstrate:

-   Full-stack development expertise
-   Modern React and TypeScript best practices
-   RESTful API design and implementation
-   Database modeling with MongoDB and Mongoose
-   Authentication and authorization with JWT
-   File upload handling and multipart form data
-   State management with Redux Toolkit
-   Secure coding practices
-   Clean code architecture and modular design
-   Git workflow and version control

---

## 📈 Roadmap

-   [x] Project setup and initial configuration
-   [x] User authentication (register/login)
-   [x] JWT access and refresh token system
-   [x] Protected routes and auth guards
-   [x] User profile pages
-   [x] Post creation with photo uploads
-   [x] Post editing and deletion
-   [x] News feed display
-   [x] Permission-based post management
-   [x] Component architecture (modular and reusable)
-   [ ] Post reactions (like, love, etc.)
-   [ ] Comments and replies system
-   [ ] Real-time chat implementation
-   [ ] Follow/unfollow functionality
-   [ ] Friend system
-   [ ] Notifications backend
-   [ ] Search functionality
-   [ ] Profile photo upload
-   [ ] Activity tracking
-   [x] Deployment to production (Vercel + Render)

---

## 🙏 Acknowledgments

-   React and TypeScript communities
-   MongoDB documentation and resources
-   Express.js framework contributors
-   Open-source libraries and tools used in this project
-   Tailwind CSS for the utility-first CSS framework

---

_Last Updated: February 2026_

