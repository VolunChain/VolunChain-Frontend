'use client';

import { useEffect, useState } from 'react';
import { useAuthStore, initializeAxiosAuth, apiClient } from '../lib/auth-example';
import axiosInstance from '../lib/axios';

export default function AuthDemoComponent() {
  const { token, user, isAuthenticated, login, logout } = useAuthStore();
  const [apiResponse, setApiResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize axios auth integration
    initializeAxiosAuth();
    console.log('✅ Axios auth initialized');
  }, []);

  const handleLogin = () => {
    const mockUser = {
      id: 'demo-' + Date.now(),
      email: 'demo@volunchain.com',
      name: 'Demo User',
      role: 'volunteer',
    };
    const mockToken = 'demo-jwt-' + Math.random().toString(36).substr(2, 9);
    
    login(mockToken, mockUser);
    console.log('✅ User logged in:', { token: mockToken, user: mockUser });
  };

  const handleLogout = () => {
    logout();
    setApiResponse('');
    console.log('✅ User logged out');
  };

  const testApiCall = async (endpoint: string) => {
    setIsLoading(true);
    setApiResponse('');
    
    try {
      console.log(`🚀 Making API call to: ${endpoint}`);
      console.log(`🔑 Using token: ${token ? token.substring(0, 20) + '...' : 'None'}`);
      
      // This will fail because there's no actual server, but we can check the headers
      const response = await axiosInstance.get(endpoint);
      setApiResponse(`✅ Success: ${JSON.stringify(response.data)}`);
    } catch (error: any) {
      // Expected to fail since no server is running
      const errorMsg = error.message || 'Network error (expected - no server running)';
      setApiResponse(`ℹ️ Expected network error: ${errorMsg}`);
      console.log('ℹ️ API call failed as expected (no server):', error.message);
      
      // Check if Authorization header was added
      if (error.config?.headers?.Authorization) {
        console.log('✅ Authorization header was correctly added:', error.config.headers.Authorization);
        setApiResponse(prev => prev + `\n✅ Authorization header: ${error.config.headers.Authorization}`);
      } else {
        console.log('ℹ️ No Authorization header (user not logged in)');
        setApiResponse(prev => prev + '\nℹ️ No Authorization header (not logged in)');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const testApiClientMethods = async () => {
    setIsLoading(true);
    setApiResponse('Testing API client methods...\n');

    const tests = [
      { name: 'Get Profile', fn: () => apiClient.getProfile() },
      { name: 'Get Volunteers', fn: () => apiClient.getVolunteers() },
      { name: 'Get Companies', fn: () => apiClient.getCompanies() },
    ];

    for (const test of tests) {
      try {
        await test.fn();
        setApiResponse(prev => prev + `✅ ${test.name}: Headers injected correctly\n`);
      } catch (error: any) {
        const hasAuthHeader = error.config?.headers?.Authorization;
        setApiResponse(prev => prev + `${hasAuthHeader ? '✅' : '❌'} ${test.name}: ${hasAuthHeader ? 'Auth header present' : 'No auth header'}\n`);
      }
    }
    
    setIsLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🔐 Auth Integration Demo</h2>
      
      {/* Auth Status */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold mb-3">Authentication Status</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className={`inline-block w-3 h-3 rounded-full ${isAuthenticated ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="font-medium">{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</span>
          </div>
          {user && (
            <div className="text-sm text-gray-600">
              <p><strong>User:</strong> {user.name} ({user.email})</p>
              <p><strong>Role:</strong> {user.role}</p>
            </div>
          )}
          {token && (
            <div className="text-sm text-gray-600">
              <p><strong>Token:</strong> {token.substring(0, 30)}...</p>
            </div>
          )}
        </div>
      </div>

      {/* Auth Controls */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={handleLogin}
          disabled={isAuthenticated}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Login
        </button>
        <button
          onClick={handleLogout}
          disabled={!isAuthenticated}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Logout
        </button>
      </div>

      {/* API Testing */}
      <div className="space-y-4">
        <h3 className="font-semibold">API Call Testing</h3>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => testApiCall('/api/profile')}
            disabled={isLoading}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
          >
            Test /api/profile
          </button>
          <button
            onClick={() => testApiCall('/api/volunteers')}
            disabled={isLoading}
            className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-400"
          >
            Test /api/volunteers
          </button>
          <button
            onClick={testApiClientMethods}
            disabled={isLoading}
            className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-gray-400"
          >
            Test API Client
          </button>
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 text-blue-600">
            <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
            <span>Making API call...</span>
          </div>
        )}

        {/* API Response */}
        {apiResponse && (
          <div className="bg-black text-green-400 p-4 rounded font-mono text-sm whitespace-pre-wrap">
            <h4 className="text-white font-bold mb-2">API Response:</h4>
            {apiResponse}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">💡 How to Test</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Click &quot;Login&quot; to authenticate</li>
          <li>Test API calls - check that Authorization headers are added</li>
          <li>Open browser DevTools → Network tab to see actual requests</li>
          <li>Try &quot;Logout&quot; and test again - no Authorization header should be sent</li>
          <li>Check browser console for detailed logs</li>
        </ol>
      </div>
    </div>
  );
}
