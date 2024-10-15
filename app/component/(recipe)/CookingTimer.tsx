import { useState, useEffect } from 'react';

interface CookingTimerProps {
  duration: number; // in seconds
  onFinish: () => void;
}

const CookingTimer: React.FC<CookingTimerProps> = ({ duration, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration); // duration이 변경될 때 timeLeft를 업데이트합니다.

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          onFinish(); // 시간이 다 되면 onFinish 호출
          clearInterval(timerId); // 타이머 정리
          return 0; // 타이머가 0이 되면 stop
        }
      });
    }, 1000);

    return () => clearInterval(timerId); // 컴포넌트가 언마운트되거나 timerId가 변경될 때 타이머를 정리합니다.
  }, [duration, onFinish]); // duration과 onFinish가 변경될 때마다 effect 실행

  return <p>남은 시간: {timeLeft}초</p>;
};

export default CookingTimer;
