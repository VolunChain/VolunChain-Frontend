import { useCallback, useRef, useState } from "react";

type AsyncTask = () => Promise<void>;

export function useAsyncQueue() {
  const queueRef = useRef<AsyncTask[]>([]);
  const isRunning = useRef(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const runNext = useCallback(async () => {
    if (isRunning.current) return;
    const nextTask = queueRef.current.shift();

    if (!nextTask) {
      setIsProcessing(false);
      return;
    }

    isRunning.current = true;
    setIsProcessing(true);

    try {
      await nextTask();
    } finally {
      isRunning.current = false;
      runNext();
    }
  }, []);

  const enqueue = useCallback(
    (task: AsyncTask) => {
      return new Promise<void>((resolve, reject) => {
        const wrappedTask = async () => {
          try {
            await task();
            resolve();
          } catch (error) {
            reject(error);
          }
        };

        queueRef.current.push(wrappedTask);
        runNext();
      });
    },
    [runNext]
  );

  const clearQueue = useCallback(() => {
    queueRef.current = [];
    isRunning.current = false;
    setIsProcessing(false);
  }, []);

  return { isProcessing, enqueue, clearQueue };
}
