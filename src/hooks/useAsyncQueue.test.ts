import { renderHook, act } from "@testing-library/react";
import { useAsyncQueue } from "./useAsyncQueue";

// Helper to create a mock async task with a delay
const createAsyncTask = (name: string, delay: number, shouldReject = false) => {
  return () =>
    new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (shouldReject) {
          reject(new Error(`Task ${name} failed`));
        } else {
          resolve();
        }
      }, delay);
    });
};

describe("useAsyncQueue", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("executes tasks sequentially in FIFO order", async () => {
    const { result } = renderHook(() => useAsyncQueue());
    const logSpy = jest.spyOn(console, "log").mockImplementation();

    const task1 = createAsyncTask("Task 1", 100);
    const task2 = createAsyncTask("Task 2", 100);

    await act(async () => {
      result.current.enqueue(() =>
        task1().then(() => console.log("Task 1 done"))
      );
      result.current.enqueue(() =>
        task2().then(() => console.log("Task 2 done"))
      );
    });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(logSpy).toHaveBeenCalledWith("Task 1 done");
    expect(logSpy).not.toHaveBeenCalledWith("Task 2 done");

    act(() => {
      jest.advanceTimersByTime(100);
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(logSpy).toHaveBeenCalledWith("Task 2 done");
    expect(logSpy.mock.calls).toEqual([["Task 1 done"], ["Task 2 done"]]);

    logSpy.mockRestore();
  });

  it("updates isProcessing state correctly", async () => {
    const { result } = renderHook(() => useAsyncQueue());
    const task = createAsyncTask("Task", 100);

    expect(result.current.isProcessing).toBe(false);

    await act(async () => {
      result.current.enqueue(task);
    });

    expect(result.current.isProcessing).toBe(true);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.isProcessing).toBe(false);
  });

  it("handles task errors correctly", async () => {
    const { result } = renderHook(() => useAsyncQueue());
    const errorTask = createAsyncTask("Error Task", 100, true);
    let errorCaught: Error | null = null;

    await act(async () => {
      result.current.enqueue(errorTask).catch((err) => {
        errorCaught = err;
      });
    });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(errorCaught).toEqual(new Error("Task Error Task failed"));
    expect(result.current.isProcessing).toBe(false);
  });

  it("returns a promise that resolves after task completion", async () => {
    const { result } = renderHook(() => useAsyncQueue());
    const task = createAsyncTask("Task", 100);
    let taskCompleted = false;

    await act(async () => {
      result.current.enqueue(task).then(() => {
        taskCompleted = true;
      });
    });

    expect(taskCompleted).toBe(false);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(taskCompleted).toBe(true);
  });

  it("processes tasks added after the queue was empty", async () => {
    const { result } = renderHook(() => useAsyncQueue());
    const logSpy = jest.spyOn(console, "log").mockImplementation();

    const task1 = createAsyncTask("Task 1", 100);

    await act(async () => {
      result.current.enqueue(() =>
        task1().then(() => console.log("Task 1 done"))
      );
    });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(logSpy).toHaveBeenCalledWith("Task 1 done");
    expect(result.current.isProcessing).toBe(false);

    const task2 = createAsyncTask("Task 2", 100);

    await act(async () => {
      result.current.enqueue(() =>
        task2().then(() => console.log("Task 2 done"))
      );
    });

    expect(result.current.isProcessing).toBe(true);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(logSpy).toHaveBeenCalledWith("Task 2 done");
    expect(result.current.isProcessing).toBe(false);

    logSpy.mockRestore();
  });
});
