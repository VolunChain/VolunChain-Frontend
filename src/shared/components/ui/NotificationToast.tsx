// "use client";

// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X } from "lucide-react";
// import { useNotifications } from "@hooks/useNotifications";
// import { Notification } from "@store/notifications";
// import { clsx } from "clsx";

// const NotificationToast: React.FC = () => {
//   const { notifications, dismissNotification } = useNotifications();

//   const getLevelStyles = (level: Notification["level"]) => {
//     switch (level) {
//       case "info":
//         return "bg-blue-50 border-blue-500 text-blue-800";
//       case "warning":
//         return "bg-yellow-50 border-yellow-500 text-yellow-800";
//       case "error":
//         return "bg-red-50 border-red-500 text-red-800";
//       default:
//         return "bg-gray-50 border-gray-500 text-gray-800";
//     }
//   };

//   return (
//     <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
//       <AnimatePresence>
//         {notifications.map((notification) => (
//           <motion.div
//             key={notification.id}
//             initial={{ opacity: 0, y: -20, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95, y: -20 }}
//             className={clsx(
//               "p-4 rounded-md shadow-md border-l-4",
//               getLevelStyles(notification.level)
//             )}
//           >
//             <div className="flex justify-between items-start">
//               <p>{notification.message}</p>
//               <button
//                 onClick={() => dismissNotification(notification.id)}
//                 className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
//                 aria-label="Dismiss notification"
//               >
//                 <X size={16} />
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default NotificationToast;
