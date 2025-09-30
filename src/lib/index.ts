// Main exports for the lib directory
export { default as axiosInstance, setAuthStore } from './axios';
export { useAuthStore, initializeAxiosAuth, apiClient } from './auth-example';

// Re-export the main axios instance as default
export { default } from './axios';

// Export availability scheduler service
export { AvailabilitySchedulerService, availabilitySchedulerService } from './services/availabilityScheduler.service';
export type { 
  AvailabilitySlot, 
  DayAvailability, 
  ServiceOptions, 
  WriteResult 
} from './services/availabilityScheduler.service';