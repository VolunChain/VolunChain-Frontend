"use client";

import React from "react";
import { useNotifications } from "@/hooks/useNotifications";

const NotificationExample: React.FC = () => {
  const { enqueueNotification } = useNotifications();

  const showInfoNotification = () => {
    enqueueNotification({
      message: "This is an info notification",
      level: "info",
      timeout: 3000,
    });
  };

  const showWarningNotification = () => {
    enqueueNotification({
      message: "This is a warning notification",
      level: "warning",
      timeout: 3000,
    });
  };

  const showErrorNotification = () => {
    enqueueNotification({
      message: "This is an error notification",
      level: "error",
      timeout: 3000,
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-semibold">Notification System Example</h2>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={showInfoNotification}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Show Info
        </button>
        <button
          onClick={showWarningNotification}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
        >
          Show Warning
        </button>
        <button
          onClick={showErrorNotification}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Show Error
        </button>
      </div>
    </div>
  );
};

export default NotificationExample;
