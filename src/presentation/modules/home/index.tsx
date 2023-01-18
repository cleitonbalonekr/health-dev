import { StartPomodoroFocus } from '@/application/use-cases/start-pomodoro-focus';
import React, { useEffect, useRef, useState } from 'react';

export type Props = {
  startPomodoroFocus: StartPomodoroFocus;
};
const ONE_SECOND = 1000;
const Home: React.FC<Props> = ({ startPomodoroFocus }: Props) => {
  const [pomodotoSeconds, setPomodoroSeconds] = useState(0);
  const intervalRef = useRef<number | NodeJS.Timer>(0);

  const handlerStartPomodoro = () => {
    clearInterval(intervalRef.current);
    const { endsAt } = startPomodoroFocus({
      breakTimeInMinutes: 5,
      timeToFocusInMinutes: 25,
    });
    updatePomodoroSeconds(endsAt);
  };

  const updatePomodoroSeconds = (endsAt: Date) => {
    intervalRef.current = setInterval(() => {
      const milliseconds = endsAt.getTime() - new Date().getTime();
      const diferenceInSeconds = Math.floor(
        Math.abs(milliseconds) / ONE_SECOND
      );
      setPomodoroSeconds(diferenceInSeconds);
    }, ONE_SECOND);
  };

  const getFormattedMinutes = () => {
    return (Math.floor(pomodotoSeconds / 60) % 60).toLocaleString('pt-BR', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  };

  const getFormattedSeconds = () => {
    return (pomodotoSeconds % 60).toLocaleString('pt-BR', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  };

  return (
    <main>
      <h1>
        {getFormattedMinutes()}:{getFormattedSeconds()}
      </h1>
      <button onClick={handlerStartPomodoro}>Start Pomodoro</button>
    </main>
  );
};

export default Home;
