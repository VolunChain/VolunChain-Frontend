import React from "react";
import { useAsyncQueue } from "@/hooks/useAsyncQueue";

const Example = () => {
  const { isProcessing, enqueue, clearQueue } = useAsyncQueue();

  const fakeNetworkDelay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleClick = () => {
    enqueue(() =>
      fakeNetworkDelay(5000).then(() => console.log("Task 1 completed"))
    );
    enqueue(() =>
      fakeNetworkDelay(3000).then(() => console.log("Task 2 completed"))
    );
    enqueue(() =>
      fakeNetworkDelay(500).then(() => console.log("Task 3 completed"))
    );
  };

  return (
    <div className="ml-20">
      <button className="bg-orange-500 p-4 gap-4 m-4" onClick={handleClick}>
        Start Queue
      </button>
      <button className="bg-orange-500 p-4 gap-4 m-4" onClick={clearQueue}>
        Clear Pending
      </button>
      <div>{isProcessing ? "Processing..." : "Idlllleeeeee"}</div>
    </div>
  );
};

export default Example;
