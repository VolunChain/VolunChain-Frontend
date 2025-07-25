# Auth Store Usage

## Overview

The auth store is implemented using Zustand with persistence and cross-tab synchronization.

## Features

- ✅ Global authentication state management
- ✅ Token and user data persistence in localStorage
- ✅ Cross-tab synchronization using BroadcastChannel
- ✅ TypeScript support with proper typing
- ✅ Optimized selector hooks for performance

## Usage Examples

### Basic Usage

```tsx
import { useAuth, useAuthActions } from "@/store/authStore";

function LoginComponent() {
  const { user, token, isAuthenticated } = useAuth();
  const { login, logout } = useAuthActions();

  const handleLogin = async () => {
    // Your login logic here
    const userData = { id: "1", email: "user@example.com", name: "John Doe" };
    const authToken = "your-jwt-token";

    login(userData, authToken);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.name}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### Using Individual Actions

```tsx
import { useAuthStore } from "@/store/authStore";

function ProfileComponent() {
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);

  const updateProfile = (newUserData) => {
    setUser({ ...user, ...newUserData });
  };

  return (
    <div>
      <h1>{user?.name}</h1>
      <button onClick={() => updateProfile({ name: "Updated Name" })}>
        Update Name
      </button>
    </div>
  );
}
```

### Checking Authentication Status

```tsx
import { useAuth } from "@/store/authStore";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in to access this page.</div>;
  }

  return children;
}
```

## Store Structure

### State

- `user: User | null` - Current user data
- `token: string | null` - Authentication token
- `isAuthenticated: boolean` - Derived state indicating if user is logged in

### Actions

- `login(user, token)` - Log in user with data and token
- `logout()` - Clear user data and token
- `setUser(user)` - Update user data
- `setToken(token)` - Update authentication token

### User Type

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role?: string;
}
```

## Cross-Tab Synchronization

The store automatically synchronizes logout actions across all open tabs using the BroadcastChannel API. When a user logs out in one tab, all other tabs will automatically update their authentication state.

## Persistence

User data and tokens are automatically persisted to localStorage and restored when the application loads.
