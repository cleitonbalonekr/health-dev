import { POMODORO_MODE } from '@/application/entities/pomodoro';
import {
  StartPomodoro,
  GetPomodoro,
  StopPomodoro,
} from '@/application/use-cases/pomodoro';
import { PomodoroViewModel } from '@/presentation/view-models/pomodoro-view-model';
import ConditionalView from '@/presentation/components/ConditionalView';
import React, { useEffect, useState } from 'react';
import usePomodoroTimer from './hooks/usePomodoroTimer';
import { BookPomodoroAlarm } from '@/application/use-cases/alarm';

export type Props = {
  StartPomodoro: StartPomodoro;
  GetPomodoro: GetPomodoro;
  stopPomodoro: StopPomodoro;
  bookPomodoroAlarm: BookPomodoroAlarm;
};
const Home: React.FC<Props> = ({
  StartPomodoro,
  GetPomodoro,
  stopPomodoro,
  bookPomodoroAlarm,
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
        breakTimeInMinutes: 1,
        timeToFocusInMinutes: 1,
      };
      const { endsAt, mode } = await StartPomodoro(pomodoroParams);
      const { title, description } =
        getPomodoroNotificationTitleAndDescription(mode);
      bookPomodoroAlarm({
        title,
        booksAt: endsAt,
        description,
      });
      setPomodoroMode(mode);
      setHasActivePomodoro(true);
      initPomodoroTimer(endsAt);
    } catch (error: any) {
      alert('Falha ao iniciar pomodoro' + error.message);
    }
  };

  const getPomodoroNotificationTitleAndDescription = (mode: POMODORO_MODE) => {
    return PomodoroViewModel.isFocusMode(mode)
      ? {
          title: 'Parabéns!! Ciclo de foco concluido!',
          description: 'É hora de descansar, levante e pegue um ar.',
        }
      : {
          title: 'Descanso finalizado!',
          description: 'É hora de voltar ao trabalho',
        };
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
        {PomodoroViewModel.isBreakTimeMode(pomodoroMode) ? 'DESCANSO' : 'FOCO'}
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
