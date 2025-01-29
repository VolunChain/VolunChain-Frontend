// components/animations/CountUp.tsx
import React, { useState, useEffect } from "react";

interface CountUpProps {
  endValue: number;
  duration?: number;
  steps?: number;
}

const CountUp: React.FC<CountUpProps> = ({
  endValue,
  duration = 2000, // default 2 seconds
  steps = 60, // default 60 steps
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // Cubic easing for smooth animation
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * endValue));

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [endValue, duration, steps]);

  return <>{count.toLocaleString()}</>;
};
export default CountUp;
