import { useRef, useState } from 'react';

interface Params {
  stopPomodoroCallback: () => void;
}
const ONE_SECOND_IN_MILISSECONDS = 1000;

const usePomodoroTimer = ({ stopPomodoroCallback }: Params) => {
  const [pomodotoSeconds, setPomodoroSeconds] = useState(0);
  const intervalRef = useRef<number | NodeJS.Timer>(0);

  const getDifferenceInSeconds = (endsAt: Date) => {
    const milliseconds = endsAt.getTime() - new Date().getTime();
    const diferenceInSeconds = Math.floor(
      Math.abs(milliseconds) / ONE_SECOND_IN_MILISSECONDS
    );
    return diferenceInSeconds;
  };

  const initPomodoroTimer = (endsAt: Date) => {
    setPomodoroSeconds(getDifferenceInSeconds(endsAt));
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const diferenceInSeconds = getDifferenceInSeconds(endsAt);
      setPomodoroSeconds(diferenceInSeconds);
      if (diferenceInSeconds === 0) {
        stopPomodoroTimer();
      }
    }, ONE_SECOND_IN_MILISSECONDS);
  };

  const stopPomodoroTimer = () => {
    clearInterval(intervalRef.current);
    setPomodoroSeconds(0);
    stopPomodoroCallback();
  };

  const getMinutes = () => {
    return (Math.floor(pomodotoSeconds / 60) % 60).toLocaleString('pt-BR', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  };

  const getSeconds = () => {
    return (pomodotoSeconds % 60).toLocaleString('pt-BR', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  };

  const getFormattedTimer = () => {
    return getMinutes() + ':' + getSeconds();
  };

  return { initPomodoroTimer, stopPomodoroTimer, getFormattedTimer };
};

export default usePomodoroTimer;
