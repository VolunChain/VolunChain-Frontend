import { useEffect, useRef, useCallback, useState } from 'react';

interface UseSessionExpiryOptions {
  /** Expiry timestamp in ms (Date.now() format) or JWT string */
  expiry: number | string;
  /** Seconds before expiry to trigger warning/modal */
  warnBeforeSeconds?: number;
  /** Callback to show modal or warning */
  onWarn?: () => void;
  /** Callback to auto-refresh token */
  onRefresh?: () => Promise<void>;
  /** Enable auto-refresh on user activity */
  refreshOnActivity?: boolean;
}

function getJwtExpiry(jwt: string): number | null {
  try {
    const payload = JSON.parse(atob(jwt.split('.')[1]));
    return payload.exp ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}

export function useSessionExpiry({
  expiry,
  warnBeforeSeconds = 60,
  onWarn,
  onRefresh,
  refreshOnActivity = false,
}: UseSessionExpiryOptions) {
  const [warned, setWarned] = useState(false);
  const timerRef = useRef<number | null>(null);
  const activityRef = useRef<(e: Event) => void>();

  // Calculate expiry timestamp
  const expiryTimestamp = typeof expiry === 'string' ? getJwtExpiry(expiry) : expiry;

  // Warn before expiry
  useEffect(() => {
    if (!expiryTimestamp) return;
    const now = Date.now();
    const warnAt = expiryTimestamp - warnBeforeSeconds * 1000;
    const timeToWarn = warnAt - now;
    if (timerRef.current) clearTimeout(timerRef.current);
    setWarned(false);
    if (timeToWarn > 0) {
      timerRef.current = setTimeout(() => {
        setWarned(true);
        onWarn && onWarn();
      }, timeToWarn);
    } else {
      setWarned(true);
      onWarn && onWarn();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [expiryTimestamp, warnBeforeSeconds, onWarn]);

  // Refresh on activity
  const handleActivity = useCallback(
    async (e: Event) => {
      if (refreshOnActivity && onRefresh) {
        await onRefresh();
      }
    },
    [refreshOnActivity, onRefresh]
  );

  useEffect(() => {
    if (!refreshOnActivity || !onRefresh) return;
    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [refreshOnActivity, onRefresh, handleActivity]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { warned };
}
