"use client";

import { useCallback } from "react";
import {
  useNotificationStore,
  NotificationLevel,
} from "../store/notifications";

interface EnqueueNotificationParams {
  message: string;
  level: NotificationLevel;
  timeout?: number;
}

export const useNotifications = () => {
  const { notifications, enqueueNotification, dismissNotification } =
    useNotificationStore();

  const enqueue = useCallback(
    ({ message, level, timeout = 5000 }: EnqueueNotificationParams) => {
      enqueueNotification({ message, level, timeout });
    },
    [enqueueNotification]
  );
  const dismiss = useCallback(
    (id: string) => {
      dismissNotification(id);
    },
    [dismissNotification]
  );

  return {
    notifications,
    enqueueNotification: enqueue,
    dismissNotification: dismiss,
  };
};
