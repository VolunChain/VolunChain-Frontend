import { useNotificationStore } from '@/store/notification'

export const useNotifications = () => {
    const notifications = useNotificationStore(state => state.notifications)
    const enqueueNotification = useNotificationStore(state => state.enqueueNotification)
    const dismissNotification = useNotificationStore(state => state.dismissNotification)

    return {
        notifications,
        enqueueNotification,
        dismissNotification
    }
}
