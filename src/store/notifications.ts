import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { isClient } from '../utils/localStorage';

export type NotificationLevel = 'info' | 'warning' | 'error';

export interface Notification {
  id: string;
  message: string;
  level: NotificationLevel;
  timeout?: number;
  createdAt: number;
}

interface NotificationState {
  notifications: Notification[];
  timeoutIds: Record<string, NodeJS.Timeout>;
  enqueueNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  dismissNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      timeoutIds: {},
      enqueueNotification: (notification) => {
        const id = uuidv4();
        const createdAt = Date.now();
        const newNotification: Notification = {
          ...notification,
          id,
          createdAt,
        };
        
        set((state) => ({
          notifications: [...state.notifications, newNotification],
        }));
        
        if (notification.timeout && isClient) {
          const timeoutId = setTimeout(() => {
            get().dismissNotification(id);
          }, notification.timeout);
          
          set((state) => ({
            timeoutIds: { ...state.timeoutIds, [id]: timeoutId },
          }));
        }
      },
      dismissNotification: (id) => {
        const { timeoutIds } = get();
        
        if (timeoutIds[id] && isClient) {
          clearTimeout(timeoutIds[id]);
        }
        
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
          timeoutIds: Object.fromEntries(
            Object.entries(state.timeoutIds).filter(([key]) => key !== id)
          ),
        }));
      },
    }),
    {
      name: 'volunchain-notifications',
      storage: createJSONStorage(() => isClient ? localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      }),
      partialize: (state) => ({ notifications: state.notifications }),
      onRehydrateStorage: () => (state) => {
        if (state && isClient) {
          state.notifications.forEach((notification) => {
            if (notification.timeout) {
              const timeElapsed = Date.now() - notification.createdAt;
              const remainingTime = notification.timeout - timeElapsed;
              
              if (remainingTime > 0) {
                const timeoutId = setTimeout(() => {
                  state.dismissNotification(notification.id);
                }, remainingTime);
                
                state.timeoutIds[notification.id] = timeoutId;
              } else {
                state.dismissNotification(notification.id);
              }
            }
          });
        }
      },
    }
  )
);
