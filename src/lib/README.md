# Centralized Axios Instance with Authentication

This directory contains a centralized Axios instance that automatically injects authentication tokens into all outgoing requests.

## Files

- `axios.ts` - Main Axios instance with request/response interceptors
- `auth-example.ts` - Example implementation showing how to integrate with Zustand auth store

## Features

### 🔐 Automatic Token Injection
- Automatically adds `Authorization: Bearer {token}` header to all requests
- Reads token from Zustand auth store
- No need to manually add auth headers to individual requests

### 🚨 Auto-Logout on Unauthorized
- Automatically handles 401 responses
- Clears auth state when unauthorized
- Redirects to login page
- Cleans up localStorage

### ⚙️ Configurable
- Easy to integrate with any Zustand auth store
- Flexible auth store interface
- Configurable base URL and timeout

## Setup

### 1. Create Your Auth Store

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: (token, user) => set({ token, user, isAuthenticated: true }),
      logout: () => set({ token: null, user: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
);
```

### 2. Connect Auth Store to Axios

```typescript
import { setAuthStore } from '@/lib/axios';
import { useAuthStore } from '@/stores/auth';

// Call this once in your app initialization (e.g., in layout.tsx or _app.tsx)
export const initializeAuth = () => {
  setAuthStore(useAuthStore);
};
```

### 3. Use the Axios Instance

```typescript
import axiosInstance from '@/lib/axios';

// All requests will automatically include the auth token
const getProfile = () => axiosInstance.get('/users/profile');
const updateProfile = (data) => axiosInstance.put('/users/profile', data);
```

## Environment Variables

Update your `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://your-api-url.com/api
```

## Error Handling

The instance automatically handles:

- **401 Unauthorized**: Auto-logout and redirect to login
- **Network errors**: Standard Axios error handling
- **Timeout**: 10-second default timeout

## Customization

### Custom Base URL

```typescript
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
});
```

### Custom Error Handling

```typescript
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      // Handle forbidden access
    }
    return Promise.reject(error);
  }
);
```

## Integration with Next.js App

Add to your `app/layout.tsx`:

```typescript
'use client';

import { useEffect } from 'react';
import { initializeAuth } from '@/lib/auth-example';

export default function RootLayout({ children }) {
  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

## Best Practices

1. **Initialize Once**: Call `initializeAuth()` only once in your app
2. **Error Boundaries**: Wrap your app with error boundaries to handle API errors
3. **Loading States**: Use loading states for better UX during API calls
4. **Retry Logic**: Consider adding retry logic for failed requests

## Troubleshooting

### Token Not Being Added
- Ensure `setAuthStore()` has been called
- Verify your auth store has the correct structure
- Check that the token exists in the store

### Auto-Logout Not Working
- Verify the 401 response is coming from your API
- Check browser console for any errors
- Ensure localStorage key matches your auth store configuration
