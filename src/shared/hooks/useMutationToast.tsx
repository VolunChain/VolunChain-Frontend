"use client";

import { useEffect } from 'react';
import toast from 'react-hot-toast';
import type { UseMutationResult } from '@tanstack/react-query';

interface ToastConfig {
  duration?: number;
  position?: 'top-center' | 'top-right' | 'top-left' | 'bottom-center' | 'bottom-right' | 'bottom-left';
  style?: React.CSSProperties;
  successMessage?: string;
  errorMessage?: string;
  successIcon?: string;
  errorIcon?: string;
}

const useMutationToast = <TData, TError, TVariables, TContext>(
  mutation: UseMutationResult<TData, TError, TVariables, TContext>,
  config: ToastConfig = {}
) => {
  const {
    duration = 4000,
    position = 'top-center',
    style = {},
    successMessage = 'Operation completed successfully!',
    errorMessage = 'An error occurred. Please try again.',
  } = config;

  useEffect(() => {
    const baseStyle: React.CSSProperties = {
      borderRadius: '12px',
      padding: '16px 24px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: '16px',
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      maxWidth: '400px',
      transition: 'all 0.3s ease-in-out',
      ...style,
    };

    if (mutation.status === 'success') {
      toast.success(
        (t) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>{}</span>
            <span>{successMessage}</span>
          </div>
        ),
        {
          duration,
          position,
          style: {
            ...baseStyle,
            background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          },
        }
      );
    }

    if (mutation.status === 'error') {
      const message = mutation.error instanceof Error && mutation.error.message
        ? mutation.error.message
        : errorMessage;
      toast.error(
        (t) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>{}</span>
            <span>{message}</span>
          </div>
        ),
        {
          duration,
          position,
          style: {
            ...baseStyle,
            background: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          },
        }
      );
    }
  }, [mutation.status, mutation.error, successMessage, errorMessage, duration, position, style, ]);

  return mutation;
};

export default useMutationToast;