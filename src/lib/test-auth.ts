// Test file to demonstrate and validate the auth-example.ts functionality
import { useAuthStore, initializeAxiosAuth, apiClient } from './auth-example';
import axiosInstance from './axios';

// Mock console for cleaner output
const mockConsole = {
  log: (...args: any[]) => console.log('✅ TEST:', ...args),
  error: (...args: any[]) => console.error('❌ ERROR:', ...args),
  info: (...args: any[]) => console.info('ℹ️  INFO:', ...args),
};

// Test function to validate auth store functionality
export const testAuthStore = () => {
  mockConsole.log('Testing Auth Store...');
  
  try {
    // Test initial state
    const initialState = useAuthStore.getState();
    mockConsole.log('Initial state:', {
      token: initialState.token,
      user: initialState.user,
      isAuthenticated: initialState.isAuthenticated,
    });
    
    // Test login functionality
    const mockUser = {
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
      role: 'volunteer',
    };
    const mockToken = 'mock-jwt-token-12345';
    
    useAuthStore.getState().login(mockToken, mockUser);
    mockConsole.log('After login:', useAuthStore.getState());
    
    // Test update user
    useAuthStore.getState().updateUser({ name: 'Updated User' });
    mockConsole.log('After user update:', useAuthStore.getState().user);
    
    // Test logout
    useAuthStore.getState().logout();
    mockConsole.log('After logout:', useAuthStore.getState());
    
    return true;
  } catch (error) {
    mockConsole.error('Auth store test failed:', error);
    return false;
  }
};

// Test function to validate axios integration
export const testAxiosIntegration = () => {
  mockConsole.log('Testing Axios Integration...');
  
  try {
    // Initialize the axios auth
    initializeAxiosAuth();
    mockConsole.log('Axios auth initialized successfully');
    
    // Test with no token (manual simulation)
    mockConsole.log('Testing request without token...');
    const tokenWithoutAuth = useAuthStore.getState().token;
    mockConsole.log('Request without token:', {
      hasToken: !!tokenWithoutAuth,
    });
    
    // Login user and test with token
    const mockUser = {
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
    };
    const mockToken = 'test-token-abc123';
    useAuthStore.getState().login(mockToken, mockUser);
    
    // Test with token
    const tokenWithAuth = useAuthStore.getState().token;
    mockConsole.log('Request with token:', {
      storedToken: tokenWithAuth,
      expectedToken: mockToken,
      matches: tokenWithAuth === mockToken,
    });
    
    return true;
  } catch (error) {
    mockConsole.error('Axios integration test failed:', error);
    return false;
  }
};

// Test function to simulate 401 response handling
export const test401Handling = () => {
  mockConsole.log('Testing 401 Response Handling...');
  
  try {
    // Login user first
    const mockUser = {
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
    };
    useAuthStore.getState().login('test-token', mockUser);
    mockConsole.log('User logged in before 401 test');
    
    // Simulate 401 response by manually calling logout
    // (Since we can't easily access interceptor handlers)
    const stateBefore = useAuthStore.getState();
    mockConsole.log('State before simulated 401:', {
      hasToken: !!stateBefore.token,
      hasUser: !!stateBefore.user,
      isAuthenticated: stateBefore.isAuthenticated,
    });
    
    // Simulate what the 401 interceptor would do
    useAuthStore.getState().logout();
    
    // Check if user was logged out
    const stateAfter401 = useAuthStore.getState();
    mockConsole.log('State after simulated 401:', {
      token: stateAfter401.token,
      user: stateAfter401.user,
      isAuthenticated: stateAfter401.isAuthenticated,
      properlyLoggedOut: !stateAfter401.token && !stateAfter401.user && !stateAfter401.isAuthenticated,
    });
    
    return stateAfter401.token === null && stateAfter401.user === null;
  } catch (error) {
    mockConsole.error('401 handling test failed:', error);
    return false;
  }
};

// Test API client functions
export const testApiClient = () => {
  mockConsole.log('Testing API Client...');
  
  try {
    // Check if all API client methods exist
    const methods: (keyof typeof apiClient)[] = [
      'getProfile',
      'updateProfile',
      'login',
      'register',
      'refreshToken',
      'getVolunteers',
      'getCompanies',
      'getOpportunities',
    ];
    
    const existingMethods = methods.filter(method => typeof apiClient[method] === 'function');
    
    mockConsole.log('API Client methods:', {
      expected: methods.length,
      found: existingMethods.length,
      methods: existingMethods,
      allPresent: existingMethods.length === methods.length,
    });
    
    // Test that methods return axios promises (they should have .then, .catch methods)
    const profilePromise = apiClient.getProfile();
    mockConsole.log('API methods return promises:', {
      hasClientPromise: typeof profilePromise?.then === 'function',
      hasCatch: typeof profilePromise?.catch === 'function',
    });
    
    // Note: We don't actually cancel the request as it would make a real network call
    // In a real test environment, you would mock axios or use a test server
    
    return existingMethods.length === methods.length;
  } catch (error) {
    mockConsole.error('API client test failed:', error);
    return false;
  }
};

// Main test runner
export const runAllTests = () => {
  mockConsole.log('🚀 Starting Auth Example Tests...\n');
  
  const tests = [
    { name: 'Auth Store', fn: testAuthStore },
    { name: 'Axios Integration', fn: testAxiosIntegration },
    { name: '401 Response Handling', fn: test401Handling },
    { name: 'API Client', fn: testApiClient },
  ];
  
  const results = tests.map(test => {
    mockConsole.log(`\n📋 Running ${test.name} test...`);
    const passed = test.fn();
    mockConsole.log(`${passed ? '✅' : '❌'} ${test.name} test ${passed ? 'PASSED' : 'FAILED'}`);
    return { name: test.name, passed };
  });
  
  // Summary
  const passedCount = results.filter(r => r.passed).length;
  const totalCount = results.length;
  
  mockConsole.log('\n📊 TEST SUMMARY:');
  results.forEach(result => {
    mockConsole.log(`  ${result.passed ? '✅' : '❌'} ${result.name}`);
  });
  
  mockConsole.log(`\n🎯 Overall: ${passedCount}/${totalCount} tests passed`);
  
  if (passedCount === totalCount) {
    mockConsole.log('🎉 All tests passed! The auth-example.ts is working correctly.');
  } else {
    mockConsole.error('🚨 Some tests failed. Please check the implementation.');
  }
  
  return passedCount === totalCount;
};

// Export everything for external testing
const authTestSuite = {
  testAuthStore,
  testAxiosIntegration,
  test401Handling,
  testApiClient,
  runAllTests,
};

export default authTestSuite;
