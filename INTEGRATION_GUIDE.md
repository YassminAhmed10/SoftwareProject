# Login & SignUp Integration with Backend

## Overview
The login page has been successfully connected to the Django backend. The application now includes complete authentication flow with JWT tokens.

## Files Modified/Created

### 1. **API Service** (`src/service/apiservice.js`)
- `loginUser(username, password)` - Authenticates user and stores JWT tokens
- `registerUser(username, email, password)` - Creates new user account
- `getUserProfile()` - Retrieves authenticated user profile
- `logoutUser()` - Clears stored authentication data
- `isAuthenticated()` - Checks if user is logged in
- `getStoredUser()` - Retrieves cached user data
- `getAccessToken()` - Gets the JWT access token

### 2. **LoginPage** (`src/pages/LoginPage.jsx`)
- Connected to backend API using `loginUser()` function
- Added error handling and validation
- Shows loading state during authentication
- Displays error messages for failed login attempts
- Updated CSS for error message styling

### 3. **SignUpPage** (`src/pages/SignUpPage.jsx`)
- Connected to backend API using `registerUser()` function
- Added form validation (password match, minimum length)
- Shows loading state during registration
- Displays error messages for failed signup attempts

### 4. **App.jsx** 
- Added authentication state management
- Protected routes - shows login/signup pages when not authenticated
- Shows dashboard and other protected pages when authenticated
- Routes redirect based on authentication status

### 5. **CSS Updates**
- Added error message styling in `Login.css` and `SignUpPage.css`
- Added disabled state styling for submit buttons during loading

## Backend Integration

The backend API endpoints used are:
- **POST** `/api/login` - Login with email and password
- **POST** `/api/signup` - Register new user
- **GET** `/api/profile` - Get user profile (requires authentication)

Backend is running at: `http://localhost:8000`
Frontend is running at: `http://localhost:3000`

## How It Works

### Login Flow
1. User enters username/email and password on LoginPage
2. Form validates inputs
3. `loginUser()` sends credentials to backend
4. Backend validates and returns JWT tokens + user data
5. Tokens and user data are stored in localStorage
6. App sets authenticated state to true
7. User is redirected to dashboard

### Signup Flow
1. User fills registration form with full name, email, password
2. Form validates password match and minimum length
3. `registerUser()` sends data to backend
4. Backend creates user and returns JWT tokens + user data
5. Tokens and user data are stored in localStorage
6. App sets authenticated state to true
7. User is redirected to dashboard

### Protected Routes
- When user is not authenticated, they see login/signup pages
- When user is authenticated, they see dashboard and app pages
- JWT token in localStorage is checked on app load
- Token is sent in Authorization header for API requests requiring authentication

## Token Management

**Access Token**: Stored in `localStorage.access_token`, valid for 1 day
**Refresh Token**: Stored in `localStorage.refresh_token`, valid for 7 days

Tokens are automatically included in all API requests that require authentication.

## Testing

To test the login/signup:

1. Start Django backend:
```bash
cd system/backend
python manage.py runserver
```

2. Start React frontend:
```bash
cd system
npm run dev
```

3. Navigate to `http://localhost:3000`
4. Sign up with new account or login if you have one
5. You should be redirected to the dashboard

## Notes

- The backend expects login with `email` field (even though labeled as username in UI)
- Make sure Django is running on port 8000
- Make sure CORS is properly configured in Django settings
- Check browser console for detailed error messages if login fails
- User data is cached in localStorage for quick access

## Next Steps

- Implement password reset functionality
- Add email verification for signup
- Add "Remember Me" functionality for persistent login
- Implement refresh token rotation
- Add logout endpoint to backend
