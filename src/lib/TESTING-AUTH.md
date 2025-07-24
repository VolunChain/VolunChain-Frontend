# 🧪 Testing the Auth System

This guide shows you how to test the centralized Axios instance with authentication.

## 🚀 Quick Test (Node.js)

Run the standalone test to verify the basic functionality:

```bash
node test-auth-node.js
```

This will test:
- ✅ Auth store state management
- ✅ Token handling
- ✅ Login/logout functionality
- ✅ API method structure

## 🌐 Full Integration Test (Browser)

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Visit the test page:**
   ```
   http://localhost:3000/test-auth
   ```

3. **Test features:**
   - Click "Run All Tests" for automated testing
   - Use "Manual Login" to test authentication flow
   - Watch real-time auth state changes
   - Check browser console for network requests

## 📋 What Gets Tested

### Auth Store (`useAuthStore`)
- ✅ Initial state (no token, no user)
- ✅ Login functionality (sets token and user)
- ✅ Logout functionality (clears all data)
- ✅ User update functionality
- ✅ State persistence

### Axios Integration
- ✅ Token injection into request headers
- ✅ Authorization header format: `Bearer {token}`
- ✅ Automatic token reading from Zustand store
- ✅ No header when no token present

### 401 Response Handling
- ✅ Auto-logout on 401 responses
- ✅ Auth state cleared
- ✅ localStorage cleaned up
- ✅ Redirect to login page (browser only)

### API Client
- ✅ All API methods present
- ✅ Methods return Axios promises
- ✅ Proper parameter handling

## 🔧 Manual Testing

### Test Token Injection

1. **Login with the auth store:**
   ```javascript
   // In browser console
   const { login } = window.useAuthStore.getState();
   login('test-token-123', { id: '1', email: 'test@example.com', name: 'Test' });
   ```

2. **Make an API call and check headers:**
   ```javascript
   // Check network tab for Authorization header
   window.axiosInstance.get('/test')
     .catch(err => console.log('Expected error - no server running'));
   ```

### Test Auto-Logout

1. **Setup mock 401 response:**
   ```javascript
   // Simulate 401 response
   const mockError = { response: { status: 401 } };
   // Check that user gets logged out
   ```

## 📁 File Structure

```
src/lib/
├── axios.ts          # Main Axios instance with interceptors
├── auth-example.ts   # Example Zustand auth store
├── test-auth.ts      # Browser test suite
├── index.ts          # Export utilities
└── README.md         # Documentation

src/app/test-auth/
└── page.tsx          # Test page component

test-auth-node.js     # Node.js test runner
```

## 🛠️ Troubleshooting

### Tests Fail in Node.js
- ✅ Expected - some features are browser-specific
- ✅ Focus on structure and logic tests
- ✅ Use browser tests for full integration

### Network Errors in Browser
- ✅ Normal - no backend server running
- ✅ Check that Authorization headers are being sent
- ✅ Verify token is properly stored in Zustand

### State Not Persisting
- ✅ Check localStorage in browser DevTools
- ✅ Verify `auth-storage` key exists
- ✅ Test page refresh behavior

### TypeScript Errors
- ✅ Ensure all dependencies are installed: `npm install`
- ✅ Restart TypeScript server in VS Code
- ✅ Check import paths are correct

## ✅ Success Criteria

You'll know everything is working when:

1. **Node.js tests pass** (basic structure validation)
2. **Browser tests pass** (full integration)
3. **Network requests include Authorization headers** (when logged in)
4. **Auth state persists across page refreshes**
5. **Auto-logout works on 401 responses**

## 🎯 Next Steps

After testing, integrate into your app:

1. **Move auth store to appropriate location** (e.g., `src/stores/auth.ts`)
2. **Update import paths** throughout your app
3. **Initialize in your root layout** (`app/layout.tsx`)
4. **Add your real API endpoints** to the base URL
5. **Customize error handling** as needed
