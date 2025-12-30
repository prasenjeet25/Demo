# Student Portal - Frontend

A React-based frontend application for the Student Portal learning platform, built with Vite.

## Features

- **Authentication**: Login system with JWT token management
- **Available Courses**: Browse all active courses with detailed information
- **Course Registration**: Register for courses with a simple form
- **My Courses**: View all enrolled courses
- **Responsive Design**: Mobile-friendly interface
- **Modern UI**: Clean and intuitive user interface

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. The application will be available at `http://localhost:5173` (default Vite port)

## Backend Configuration

Make sure your backend server is running on `http://localhost:4000` (default backend port).

If your backend runs on a different port, update the `API_BASE_URL` in `src/services/api.js`.

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.jsx      # Navigation header
│   ├── CourseCard.jsx  # Course card component
│   ├── RegisterModal.jsx # Course registration modal
│   └── ProtectedRoute.jsx # Route protection component
├── context/            # React contexts
│   └── AuthContext.jsx # Authentication context
├── pages/              # Page components
│   ├── Login.jsx       # Login page
│   ├── Home.jsx        # Available courses page
│   ├── MyCourses.jsx   # Enrolled courses page
│   └── About.jsx       # About page
├── services/           # API services
│   └── api.js          # API configuration and endpoints
├── App.jsx             # Main app component with routing
└── main.jsx            # Application entry point
```

## Default Admin Credentials

- **Email:** `admin@sunbeam.com`
- **Password:** `admin123`

To create/update the admin account, navigate to the backend directory and run:
```bash
cd Project_Backend/Backend-Server
node create-admin.js
```

## API Endpoints Used

- `POST /public/auth/login` - User login
- `GET /public/courses/all-active-courses` - Get all active courses
- `POST /students/student/register-to-course` - Register for a course
- `GET /students/student/my-courses` - Get enrolled courses

## Technologies Used

- React 19
- React Router DOM 7
- Axios
- Vite
- JavaScript
