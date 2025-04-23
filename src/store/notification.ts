import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Notification {
    id: string
    message: string
    level: 'info' | 'warning' | 'error'
    timeout?: number
    createdAt: number
}

interface NotificationState {
    notifications: Notification[]
    enqueueNotification: (n: Omit<Notification, 'id' | 'createdAt'>) => void
    dismissNotification: (id: string) => void
    clearExpiredNotifications: () => void
}

export const useNotificationStore = create<NotificationState>()(
    persist(
        (set, get) => {
            return {
                notifications: [],
                enqueueNotification: (data) => {
                    const id = crypto.randomUUID();
                    const createdAt = Date.now();
                    const timeout = data.timeout ?? 0;

                    const notification: Notification = {
                        ...data,
                        id,
                        createdAt,
                    };

                    set((state) => ({
                        notifications: [...state.notifications, notification],
                    }));

                    setTimeout(() => get().dismissNotification(id), timeout);
                },
                dismissNotification: (id) => {
                    set((state) => ({
                        notifications: state.notifications.filter((n) => n.id !== id),
                    }));
                },
                clearExpiredNotifications: () => {
                    const now = Date.now();
                    set(state => ({
                        notifications: state.notifications.filter(notification => {
                            const timeout = notification.timeout ?? 0;
                            return now - notification.createdAt <= timeout;
                        })
                    }));
                },
            };
        },
        {
            name: 'notification-store',
            partialize: (state) => ({
                notifications: state.notifications,
            }),
            onRehydrateStorage: () => {
                return (state, error) => {
                    if (error) return
                    if (!state) return;

                    const now = Date.now();
                    state.notifications.forEach((notification) => {
                        const timeout = notification.timeout ?? 0;
                        const timeElapsed = now - notification.createdAt;
                        /* 
                            Edge Case : Imagine after scheduling and refreshing the page this would ensure the
                            dismissNotification is rescheduled at the remaining time 
                        */
                        if (timeElapsed <= timeout) {
                            const remainingTime = timeout - timeElapsed;
                            setTimeout(() => state.dismissNotification(notification.id), remainingTime);
                        }
                        /*
                            Edge Case: To clear notifications that are ancient in cases where the user does not give
                            the dismissNotification a chance to run
                         */
                        else {
                            state.dismissNotification(notification.id);
                        }
                    });
                };
            },
        }
    )
);
