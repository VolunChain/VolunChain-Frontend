import React from "react";
import { useAuth, useAuthActions } from "../authStore";

export const AuthExample: React.FC = () => {
  const { user, token, isAuthenticated } = useAuth();
  const { login, logout } = useAuthActions();

  const handleLogin = () => {
    const mockUser = {
      id: "1",
      email: "user@example.com",
      name: "John Doe",
      avatar: "https://example.com/avatar.jpg",
      role: "user",
    };
    const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

    login(mockUser, mockToken);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Auth Store Example</h2>

      {isAuthenticated ? (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <h3 className="font-semibold text-green-800">Authenticated User</h3>
            <p className="text-sm text-green-600">Name: {user?.name}</p>
            <p className="text-sm text-green-600">Email: {user?.email}</p>
            <p className="text-sm text-green-600">Role: {user?.role}</p>
            <p className="text-sm text-green-600 truncate">
              Token: {token?.substring(0, 20)}...
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 border border-gray-200 rounded">
            <p className="text-gray-600">Not authenticated</p>
          </div>

          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};
