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
}

export const useNotificationStore = create<NotificationState>()(
    persist(
        (set, get) => ({
            notifications: [],
            enqueueNotification: (data) => {
                const id = crypto.randomUUID()
                const createdAt = Date.now()
                const timeout = data.timeout ?? 5000

                const notification: Notification = {
                    ...data,
                    id,
                    createdAt,
                }

                set(state => ({
                    notifications: [...state.notifications, notification]
                }))

                setTimeout(() => get().dismissNotification(id), timeout)
            },
            dismissNotification: (id) => {
                set(state => ({
                    notifications: state.notifications.filter(n => n.id !== id)
                }))
            }
        }),
        {
            name: 'notification-store',
            partialize: (state) => ({
                notifications: state.notifications
            })
        }
    )
)
