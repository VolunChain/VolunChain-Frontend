'use client';

import { useEffect, useState } from 'react';
import { runAllTests } from '../../lib/test-auth';
import { useAuthStore, initializeAxiosAuth } from '../../lib/auth-example';
import AuthDemoComponent from '../../components/AuthDemoComponent';

export default function AuthTestPage() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const { token, user, isAuthenticated, login, logout } = useAuthStore();

  useEffect(() => {
    // Initialize axios auth on component mount
    initializeAxiosAuth();
  }, []);

  const runTests = () => {
    setIsRunning(true);
    setTestResults([]);
    
    // Capture console output
    const originalLog = console.log;
    const originalError = console.error;
    const originalInfo = console.info;
    
    const logs: string[] = [];
    
    console.log = (...args) => {
      const message = args.join(' ');
      logs.push(message);
      originalLog(...args);
    };
    
    console.error = (...args) => {
      const message = '❌ ' + args.join(' ');
      logs.push(message);
      originalError(...args);
    };
    
    console.info = (...args) => {
      const message = 'ℹ️ ' + args.join(' ');
      logs.push(message);
      originalInfo(...args);
    };
    
    // Run the tests
    setTimeout(() => {
      try {
        runAllTests();
      } catch (error) {
        logs.push(`❌ Test execution failed: ${error}`);
      } finally {
        // Restore console
        console.log = originalLog;
        console.error = originalError;
        console.info = originalInfo;
        
        setTestResults([...logs]);
        setIsRunning(false);
      }
    }, 100);
  };

  const handleManualLogin = () => {
    const mockUser = {
      id: 'demo-123',
      email: 'demo@volunchain.com',
      name: 'Demo User',
      role: 'volunteer',
    };
    const mockToken = 'demo-jwt-token-' + Date.now();
    login(mockToken, mockUser);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🧪 Auth System Test Page</h1>
      
      {/* Current Auth State */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-3">Current Auth State</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <strong>Token:</strong>
            <div className="text-sm text-gray-600 break-all">
              {token ? `${token.substring(0, 20)}...` : 'None'}
            </div>
          </div>
          <div>
            <strong>User:</strong>
            <div className="text-sm text-gray-600">
              {user ? `${user.name} (${user.email})` : 'None'}
            </div>
          </div>
          <div>
            <strong>Authenticated:</strong>
            <div className={`text-sm font-semibold ${isAuthenticated ? 'text-green-600' : 'text-red-600'}`}>
              {isAuthenticated ? '✅ Yes' : '❌ No'}
            </div>
          </div>
        </div>
      </div>

      {/* Manual Controls */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleManualLogin}
          disabled={isAuthenticated}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Manual Login
        </button>
        <button
          onClick={handleLogout}
          disabled={!isAuthenticated}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
        >
          Logout
        </button>
      </div>

      {/* Test Runner */}
      <div className="bg-white border rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">🚀 Automated Tests</h2>
        <button
          onClick={runTests}
          disabled={isRunning}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          {isRunning ? 'Running Tests...' : 'Run All Tests'}
        </button>
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
          <h2 className="text-xl font-semibold mb-3 text-white">📋 Test Results</h2>
          <div className="space-y-1">
            {testResults.map((result, index) => (
              <div key={index} className="whitespace-pre-wrap">
                {result}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Usage Instructions */}
      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">📚 How to Use</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Click &quot;Run All Tests&quot; to validate the auth system</li>
          <li>Use &quot;Manual Login&quot; to test the login functionality</li>
          <li>Watch the &quot;Current Auth State&quot; section to see real-time changes</li>
          <li>Check the test results for detailed validation</li>
          <li>Try making API calls from the browser console using: <code className="bg-gray-200 px-1 rounded">window.axiosInstance</code></li>
        </ol>
      </div>

      {/* Interactive Demo Component */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">🎮 Interactive Demo</h2>
        <div className="border rounded-lg p-1">
          <AuthDemoComponent />
        </div>
      </div>
    </div>
  );
}
