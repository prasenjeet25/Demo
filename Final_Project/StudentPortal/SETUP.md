# Setup Instructions

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend server running on `http://localhost:4000`

## Installation Steps

1. **Navigate to the StudentPortal directory:**
   ```bash
   cd StudentPortal
   ```

2. **Install dependencies (if not already installed):**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Open your browser and go to `http://localhost:5173` (default Vite port)

## Backend Configuration

Make sure your backend server is running before starting the frontend:

1. Navigate to the backend directory:
   ```bash
   cd Project_Backend/Backend-Server
   ```

2. Install backend dependencies (if not already done):
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   node server.js
   ```

   The backend should be running on `http://localhost:4000`

## Default Login Credentials

### Admin Account
- **Email:** `admin@sunbeam.com`
- **Password:** `admin123`

To create/update the admin account, run:
```bash
cd Project_Backend/Backend-Server
node create-admin.js
```

### Student Accounts
Students can register through the registration form. The default password hash for new student registrations is based on "Sunbeam" (as seen in the backend code).

## Features

- ✅ User authentication with JWT tokens
- ✅ Browse available courses
- ✅ Register for courses
- ✅ View enrolled courses
- ✅ Responsive design
- ✅ Modern UI matching the reference image

## Project Structure

```
StudentPortal/
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/        # React context providers
│   ├── pages/          # Page components
│   ├── services/       # API service layer
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── package.json
└── vite.config.js
```

## Troubleshooting

1. **CORS Errors:** Make sure the backend has CORS enabled (it should already be configured)

2. **API Connection Issues:** Verify the backend is running and check the `API_BASE_URL` in `src/services/api.js`

3. **Authentication Issues:** Check that tokens are being stored in localStorage correctly

4. **Port Conflicts:** If port 5173 is in use, Vite will automatically use the next available port

