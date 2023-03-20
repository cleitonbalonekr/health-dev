import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';
import { POMODORO_MODE } from '@/application/entities/pomodoro';
import { BookPomodoroAlarm, StopAlarm } from '@/application/use-cases/alarm';
import {
  StartPomodoro,
  GetPomodoro,
  StopPomodoro,
} from '@/application/use-cases/pomodoro';
import { AlarmType } from '@/application/entities/alarm';
import { PomodoroViewModel } from '@/presentation/view-models/pomodoro-view-model';
import ConditionalView from '@/presentation/components/ConditionalView';
import Container from '@/presentation/components/container';
import NavigationHeader from '@/presentation/components/navigation-header';
import BaseButton from '@/presentation/components/base-button';
import usePomodoroTimer from './hooks/usePomodoroTimer';

export type Props = {
  StartPomodoro: StartPomodoro;
  GetPomodoro: GetPomodoro;
  stopPomodoro: StopPomodoro;
  bookPomodoroAlarm: BookPomodoroAlarm;
  stopAlarm: StopAlarm;
};
const Home: React.FC<Props> = ({
  StartPomodoro,
  GetPomodoro,
  stopPomodoro,
  bookPomodoroAlarm,
  stopAlarm,
}: Props) => {
  const { getFormattedTimer, initPomodoroTimer, stopPomodoroTimer } =
    usePomodoroTimer({
      stopPomodoroCallback: () => setHasActivePomodoro(false),
    });
  const navigate = useNavigate();

  const [hasActivePomodoro, setHasActivePomodoro] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState<POMODORO_MODE>(
    POMODORO_MODE.FOCUS
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    verifyPomodoroClocks();
  }, []);

  const verifyPomodoroClocks = async () => {
    try {
      setLoading(true);
      const { endsAt, mode } = await GetPomodoro();
      if (endsAt) {
        initPomodoroTimer(endsAt);
        setHasActivePomodoro(true);
      }
      setPomodoroMode(mode);
    } catch (error: any) {
      setHasActivePomodoro(false);
    } finally {
      setLoading(false);
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
    await stopAlarm({
      alarmType: AlarmType.POMODORO,
    });
  };

  return (
    <Container>
      <NavigationHeader hideBackButton>
        <FaCog size={18} color="white" onClick={() => navigate('settings')} />
      </NavigationHeader>
      <main className="flex flex-1 flex-col items-center justify-center">
        <ConditionalView visible={loading}>
          <span>Loading...</span>
        </ConditionalView>
        <ConditionalView visible={!loading}>
          <h2 className="font-bold text-lg text-rose-400">
            {PomodoroViewModel.isBreakTimeMode(pomodoroMode)
              ? 'DESCANSO'
              : 'FOCO'}
          </h2>
          <h1 className="my-2 font-bold text-5xl">{getFormattedTimer()}</h1>
          {hasActivePomodoro ? (
            <BaseButton onClick={handlerStopPomodoro}>
              Stop Pomodoro{' '}
            </BaseButton>
          ) : (
            <BaseButton onClick={handlerStartPomodoro}>
              Start Pomodoro{' '}
            </BaseButton>
          )}
        </ConditionalView>
      </main>
    </Container>
  );
};

export default Home;
