# BeSocial 🌐

A modern, full-stack social networking platform built with React, TypeScript, Node.js, and MongoDB. BeSocial aims to provide users with a seamless social experience where they can connect, share, and engage with others.

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/giorgikilosanidze/BeSocial)

---

## 📋 Overview

BeSocial is a social networking application designed to bring people together through meaningful interactions. This portfolio project showcases modern web development practices, clean architecture, and a user-centric design approach.

### Current Status: 🚧 In Active Development

The project is currently in its early stages with core authentication functionality implemented. Additional features are being actively developed.

---

## ✨ Features

### ✅ Implemented Features

-   **User Authentication**
    -   User registration with secure password hashing (bcrypt)
    -   User login with JWT-based authentication
    -   Protected routes and session management
    -   Form validation with password visibility toggle

### 🚀 Planned Features

-   **User Profiles**
    -   Customizable profile pages
    -   Profile picture upload and management
    -   Bio and personal information
-   **Social Posts**
    -   Create, edit, and delete posts
    -   Photo and media uploads
    -   Post reactions (like, love, etc.)
    -   Comments and replies
-   **Real-time Chat**
    -   One-on-one messaging
    -   Group conversations
    -   Message notifications
-   **Social Interactions**
    -   Follow/unfollow users
    -   News feed with personalized content
    -   Notifications system
    -   Search functionality

---

## 🛠️ Tech Stack

### Frontend

-   **React 19** - UI library
-   **TypeScript** - Type safety and better developer experience
-   **Redux Toolkit** - State management
-   **React Router** - Client-side routing
-   **Tailwind CSS** - Utility-first CSS framework
-   **Vite** - Fast build tool and development server
-   **React Icons** - Icon library
-   **React Spinners** - Loading indicators

### Backend

-   **Node.js** - Runtime environment
-   **Express** - Web framework
-   **TypeScript** - Type-safe backend development
-   **MongoDB** - NoSQL database
-   **Mongoose** - MongoDB object modeling
-   **JWT** - Authentication tokens
-   **bcrypt** - Password hashing
-   **Helmet** - Security headers
-   **CORS** - Cross-origin resource sharing
-   **Zod** - Schema validation

### Development Tools

-   **ESLint** - Code linting
-   **Concurrently** - Run multiple npm scripts
-   **tsx** - TypeScript execution for Node.js
-   **dotenv** - Environment variable management

---

## 📁 Project Structure

```
BeSocial/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── assets/        # Static assets (images, fonts, etc.)
│   │   ├── config/        # App configuration and routes
│   │   ├── constants/     # Constant values and enums
│   │   ├── features/      # Feature-based modules (auth, etc.)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   └── Feed.tsx
│   │   ├── schemas/       # Validation schemas
│   │   ├── types/         # TypeScript type definitions
│   │   ├── App.tsx        # Main App component
│   │   ├── AppRoutes.tsx  # Route configuration
│   │   ├── main.tsx       # Application entry point
│   │   └── store.ts       # Redux store configuration
│   ├── public/            # Public static files
│   └── index.html         # HTML template
│
├── server/                # Backend Node.js application
│   ├── src/
│   │   ├── modules/       # Feature modules
│   │   │   ├── auth/      # Authentication module
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── auth.schema.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.types.ts
│   │   │   │   └── auth.validators.ts
│   │   │   ├── feed/      # Feed module (in development)
│   │   │   └── user/      # User module (in development)
│   │   ├── app.ts         # Express app configuration
│   │   └── server.ts      # Server entry point
│   └── .env               # Environment variables (not in git)
│
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
POST /api/auth/register
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

_More endpoints will be documented as they are implemented._

---

## 🏗️ Architecture

BeSocial follows a modular, feature-based architecture:

### Frontend Architecture

-   **Component-based** design with React
-   **Redux Toolkit** for centralized state management
-   **Feature-based** folder structure for scalability
-   **TypeScript** for type safety across the application
-   **Custom hooks** for reusable logic

### Backend Architecture

-   **MVC pattern** with modular structure
-   **Service layer** for business logic
-   **Validation** using Zod schemas
-   **Type-safe** development with TypeScript
-   **Secure** authentication using JWT and bcrypt

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

-   Full-stack development skills
-   Modern React and TypeScript practices
-   RESTful API design
-   Database modeling and management
-   Authentication and security best practices
-   Clean code and architecture
-   Git workflow and version control

---

## 📈 Roadmap

-   [x] Project setup and initial configuration
-   [x] User authentication (register/login)
-   [ ] User profile management
-   [ ] Post creation and management
-   [ ] Photo upload functionality
-   [ ] Real-time chat implementation
-   [ ] News feed and timeline
-   [ ] Reactions and comments system
-   [ ] Notifications
-   [ ] Search functionality
-   [ ] Deployment

---

## 🙏 Acknowledgments

-   React and TypeScript communities
-   MongoDB documentation
-   Open-source libraries and tools used in this project

---

_Last Updated: January 2026_
