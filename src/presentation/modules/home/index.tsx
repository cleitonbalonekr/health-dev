import { StartPomodoroFocus, GetActivePomodoro } from '@/application/use-cases';
import React, { useEffect, useRef, useState } from 'react';

export type Props = {
  startPomodoroFocus: StartPomodoroFocus;
  getActivePomodoro: GetActivePomodoro;
};
const ONE_SECOND = 1000;
const Home: React.FC<Props> = ({
  startPomodoroFocus,
  getActivePomodoro,
}: Props) => {
  const [pomodotoSeconds, setPomodoroSeconds] = useState(0);
  const intervalRef = useRef<number | NodeJS.Timer>(0);

  useEffect(() => {
    verifyActivePomodoro();
  }, []);

  const verifyActivePomodoro = async () => {
    try {
      const pomodoro = await getActivePomodoro();
      if (pomodoro?.endsAt) updatePomodoroSeconds(pomodoro.endsAt);
    } catch (error: any) {
      // alert('Error verify pomodoro' + error.message);
    }
  };

  const handlerStartPomodoro = async () => {
    try {
      clearInterval(intervalRef.current);
      const { endsAt } = await startPomodoroFocus({
        breakTimeInMinutes: 5,
        timeToFocusInMinutes: 25,
      });
      chrome.runtime.sendMessage({ time: '1' }, function (response) {
        console.log(response);
      });
      updatePomodoroSeconds(endsAt);
    } catch (error: any) {
      alert('Falha ao iniciar pomodoro' + error.message);
    }
  };

  const handlerStopPomodoro = async () => {};

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
      <button onClick={handlerStartPomodoro}>Start Pomodoro </button>
      <button onClick={handlerStopPomodoro}>Stop Pomodoro </button>
    </main>
  );
};

export default Home;
