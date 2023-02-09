import { POMODORO_MODE } from '@/application/entities/pomodoro';
import {
  StartPomodoro,
  GetPomodoro,
  StopPomodoro,
} from '@/application/use-cases';
import ConditionalView from '@/presentation/components/ConditionalView';
import React, { useEffect, useRef, useState } from 'react';
import usePomodoroTimer from './hooks/usePomodoroTimer';

export type Props = {
  StartPomodoro: StartPomodoro;
  GetPomodoro: GetPomodoro;
  stopPomodoro: StopPomodoro;
};
const Home: React.FC<Props> = ({
  StartPomodoro,
  GetPomodoro,
  stopPomodoro,
}: Props) => {
  const { getFormattedTimer, initPomodoroTimer, stopPomodoroTimer } =
    usePomodoroTimer({
      stopPomodoroCallback: () => setHasActivePomodoro(false),
    });
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
        initPomodoroTimer(endsAt);
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
      initPomodoroTimer(endsAt);
    } catch (error: any) {
      alert('Falha ao iniciar pomodoro' + error.message);
    }
  };

  const handlerStopPomodoro = async () => {
    stopPomodoroTimer();
    await stopPomodoro();
  };

  return (
    <main>
      <ConditionalView visible={loading}>
        <span>Loading...</span>
      </ConditionalView>
      <ConditionalView visible={!loading}>
        {pomodoroMode === POMODORO_MODE.BREAK_TIME ? 'DESCANSO' : 'FOCO'}
        <h1>{getFormattedTimer()}</h1>
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
