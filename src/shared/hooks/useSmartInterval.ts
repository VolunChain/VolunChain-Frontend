import { useCallback, useEffect, useRef } from "react";

export function useSmartInterval(
  callback: () => void,
  options?: {
    minDelay?: number; // default: 1000 ms
    maxDelay?: number; // default: 60000 ms
    multiplier?: number; // default: 2
    autoStart?: boolean;
  }
) {
  const {
    minDelay = 1000,
    maxDelay = 60000,
    multiplier = 2,
    autoStart = true
  } = options || {};
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const currentDelay = useRef<number | undefined>(minDelay);
  const exponentialMultiplier = useRef<number>(0);
  const isActive = useRef<boolean>(autoStart);

  const callbackFn = useCallback(callback, [callback]);

  const getNextTimerDelay = useCallback(() => {
    if (
      currentDelay.current &&
      multiplier &&
      exponentialMultiplier &&
      maxDelay
    ) {
      const nextDelay =
        currentDelay.current *
        Math.pow(multiplier, exponentialMultiplier.current);
      return Math.min(nextDelay, maxDelay);
    }
  }, [minDelay, maxDelay, multiplier]);

  const clearCurrentTimerInterval = useCallback(() => {
    if (timerId.current) {
      clearInterval(timerId.current);
      timerId.current = null;
    }
  }, []);

  const startTimerInterval = useCallback(() => {
    clearCurrentTimerInterval();
    if (isActive.current) {
      timerId.current = setInterval(() => {
        callbackFn();
        if (document.visibilityState === "hidden") {
          exponentialMultiplier.current += 1;
          currentDelay.current = getNextTimerDelay();
          startTimerInterval();
        }
      }, currentDelay.current);
    }
  }, [clearCurrentTimerInterval, callbackFn, getNextTimerDelay]);

  const resetToBaseInterval = useCallback(() => {
    currentDelay.current = minDelay;
    exponentialMultiplier.current = 0;
    startTimerInterval();
  }, [minDelay, startTimerInterval]);

  useEffect(() => {
    const handleTabChange = () => {
      if (document.visibilityState === "visible") {
        resetToBaseInterval();
      } else {
        startTimerInterval();
      }
    };

    // for older browsers..i.e those that do not have visiblitystate

    const handleFocus = () => {
      if (!isActive.current) {
        isActive.current = true;
        resetToBaseInterval();
      }
    };
    const handleBlur = () => {
      isActive.current = false;
      clearCurrentTimerInterval();
    };

    document.addEventListener("visibilitychange", handleTabChange);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    if (autoStart) {
      startTimerInterval();
    }

    return () => {
      clearCurrentTimerInterval();
      document.removeEventListener("visibilitychange", handleTabChange);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, [
    autoStart,
    clearCurrentTimerInterval,
    resetToBaseInterval,
    startTimerInterval,
    getNextTimerDelay
  ]);

  const start = useCallback(() => {
    isActive.current = true;
    resetToBaseInterval();
  }, [resetToBaseInterval]);

  const stop = useCallback(() => {
    isActive.current = false;
    clearCurrentTimerInterval();
  }, [clearCurrentTimerInterval]);

  const restart = useCallback(() => {
    isActive.current = true;
    resetToBaseInterval();
  }, [resetToBaseInterval]);

  return { start, stop, restart };
}
