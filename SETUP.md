# Frontend-Backend Connection Setup

## Environment Configuration

The frontend now uses environment variables for the backend API URL. This allows you to easily switch between different environments.

### Frontend (.env file)
```
VITE_API_URL=http://localhost:5000/api/news
```

- Change `5000` if your backend runs on a different port
- Change `localhost` if your backend runs on a different server

## Starting the Application

### 1. Start the Backend (Terminal 1)
```bash
cd backend
npm install  # if not already done
npm start
```
You should see: `✅ Server running on http://localhost:5000`

### 2. Start the Frontend (Terminal 2)
```bash
cd frontend
npm install  # if not already done
npm run dev
```
You should see: `Local: http://localhost:5173/` or similar

## Troubleshooting

### Error: "Connection refused" or backend is unreachable
1. Check if backend is running: `http://localhost:5000/health`
2. Check the console logs in browser DevTools for detailed error messages
3. Verify the API URL in `.env` file matches your backend

### API Error Messages in Console
- 🔴 Network error: Backend is down
- ⏱️ Request timeout: Backend is too slow
- 🔴 HTTP Error: Backend returned an error

## Features
- ✅ Environment variable support
- ✅ Meaningful error messages for backend downtime
- ✅ Console logs for debugging API calls
- ✅ 10-second request timeout
- ✅ CORS enabled on backend
