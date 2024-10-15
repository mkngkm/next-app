import { useState, useEffect } from 'react';

interface CookingTimerProps {
  duration: number; // in seconds
  onFinish: () => void;
}

const CookingTimer: React.FC<CookingTimerProps> = ({ duration, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration); // Update timeLeft when duration changes.

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          onFinish(); // Call onFinish when time is up
          clearInterval(timerId); // Clear timer
          return 0; // Stop timer
        }
      });
    }, 1000);

    return () => clearInterval(timerId); // Clean up timer on unmount or duration change
  }, [duration, onFinish]); // Run effect when duration or onFinish changes

  return <p className='mt-5 font-bold'>남은 시간: {timeLeft}초</p>;
};

export default CookingTimer;
