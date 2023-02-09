import { PomodoroException } from '@/application/entities/errors/pomodoro-exception';
import { POMODORO_MODE } from '@/application/entities/pomodoro';
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
  const [pomodoroMode, setPomodoroMode] = useState<POMODORO_MODE>(
    POMODORO_MODE.FOCUS
  );
  const [loading, setloading] = useState(false);

  useEffect(() => {
    verifyPomodoroClocks();
  }, []);

  const verifyPomodoroClocks = async () => {
    try {
      setloading(true);
      const { endsAt, mode } = await GetPomodoro();
      if (endsAt) {
        updatePomodoroSeconds(endsAt);
        setHasActivePomodoro(true);
      }
      setPomodoroMode(mode);
    } catch (error: any) {
      setHasActivePomodoro(false);
    } finally {
      setloading(false);
    }
  };

  const handlerStartPomodoro = async () => {
    try {
      const pomodoroParams = {
        breakTimeInMinutes: 2,
        timeToFocusInMinutes: 1,
      };
      clearInterval(intervalRef.current);
      const { endsAt, mode } = await StartPomodoro(pomodoroParams);
      if (mode === POMODORO_MODE.FOCUS) {
        chrome.runtime.sendMessage(
          { delayInMinutes: pomodoroParams.timeToFocusInMinutes },
          function (response) {
            console.log(response);
          }
        );
      } else {
        chrome.runtime.sendMessage({
          delayInMinutes: pomodoroParams.breakTimeInMinutes,
        });
      }
      setPomodoroMode(mode);
      setHasActivePomodoro(true);
      updatePomodoroSeconds(endsAt);
    } catch (error: any) {
      alert('Falha ao iniciar pomodoro' + error.message);
    }
  };

  const stopPomodoroClock = () => {
    clearInterval(intervalRef.current);
    setPomodoroSeconds(0);
    setHasActivePomodoro(false);
  };

  const handlerStopPomodoro = async () => {
    stopPomodoroClock();
    await stopPomodoro();
  };

  const updatePomodoroSeconds = (endsAt: Date) => {
    setPomodoroSeconds(getMiliseconds(endsAt));
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const diferenceInSeconds = getMiliseconds(endsAt);
      setPomodoroSeconds(diferenceInSeconds);
      if (diferenceInSeconds === 0) {
        stopPomodoroClock();
      }
    }, ONE_SECOND);
  };

  const getMiliseconds = (endsAt: Date) => {
    const milliseconds = endsAt.getTime() - new Date().getTime();
    const diferenceInSeconds = Math.floor(Math.abs(milliseconds) / ONE_SECOND);
    return diferenceInSeconds;
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
        {pomodoroMode === POMODORO_MODE.BREAK_TIME ? 'DESCANSO' : 'FOCO'}
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
