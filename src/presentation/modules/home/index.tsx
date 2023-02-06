import { PomodoroException } from '@/application/entities/errors/pomodoro-exception';
import {
  StartPomodoro,
  GetPomodoro,
  StopPomodoro,
} from '@/application/use-cases';
import ConditionalView from '@/presentation/components/ConditionalView';
import React, { useEffect, useRef, useState } from 'react';

export type Props = {
  StartPomodoro: StartPomodoro;
  GetPomodoro: GetPomodoro;
  stopPomodoro: StopPomodoro;
};
const ONE_SECOND = 1000;
const Home: React.FC<Props> = ({
  StartPomodoro,
  GetPomodoro,
  stopPomodoro,
}: Props) => {
  const [pomodotoSeconds, setPomodoroSeconds] = useState(0);
  const intervalRef = useRef<number | NodeJS.Timer>(0);
  const [hasActivePomodoro, setHasActivePomodoro] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    verifyActivePomodoro();
  }, []);

  const verifyActivePomodoro = async () => {
    try {
      setloading(true);
      const pomodoro = await GetPomodoro();
      if (pomodoro.isBreakTime) {
        updatePomodoroSeconds(pomodoro.endsAt);
      }
      setHasActivePomodoro(true);
    } catch (error: any) {
      setHasActivePomodoro(false);
    } finally {
      setTimeout(() => {
        setloading(false);
      }, ONE_SECOND);
    }
  };

  const handlerStartPomodoro = async () => {
    try {
      clearInterval(intervalRef.current);
      const { endsAt } = await StartPomodoro({
        breakTimeInMinutes: 5,
        timeToFocusInMinutes: 1,
      });
      chrome.runtime.sendMessage({ delayInMinutes: 1 }, function (response) {
        console.log(response);
      });
      setHasActivePomodoro(true);
      updatePomodoroSeconds(endsAt);
    } catch (error: any) {
      alert('Falha ao iniciar pomodoro' + error.message);
    }
  };

  const handlerStopPomodoro = async () => {
    clearInterval(intervalRef.current);
    setPomodoroSeconds(0);
    setHasActivePomodoro(false);
    await stopPomodoro();
  };

  const updatePomodoroSeconds = (endsAt: Date) => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const milliseconds = endsAt.getTime() - new Date().getTime();
      const diferenceInSeconds = Math.floor(
        Math.abs(milliseconds) / ONE_SECOND
      );
      setPomodoroSeconds(diferenceInSeconds);
      if (diferenceInSeconds === 0) {
        handlerStopPomodoro();
      }
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
      <ConditionalView visible={loading}>
        <span>Loading...</span>
      </ConditionalView>
      <ConditionalView visible={!loading}>
        <h1>
          {getFormattedMinutes()}:{getFormattedSeconds()}
        </h1>
        {hasActivePomodoro ? (
          <button onClick={handlerStopPomodoro}>Stop Pomodoro </button>
        ) : (
          <button onClick={handlerStartPomodoro}>Start Pomodoro </button>
        )}
      </ConditionalView>
    </main>
  );
};

export default Home;
