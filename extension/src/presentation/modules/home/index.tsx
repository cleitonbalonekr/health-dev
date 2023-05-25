import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'react-lottie';

import { FaPlay as Play, FaStop as Stop } from 'react-icons/fa';
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
import usePomodoroTimer from './hooks/usePomodoroTimer';
import time from './animations/time.json';
export const LOTTIE_BASE_OPTIONS = {
  loop: true,
  autoplay: false,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};
export const LOTTIE_HEIGHT = 200;
export const LOTTIE_WIDTH = 100;

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
  const animationRef = useRef<any>(null)
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
      animationRef.current?.play()
        initPomodoroTimer(endsAt);
        setHasActivePomodoro(true);
      }
      setPomodoroMode(mode);
    } catch (error: any) {
      setHasActivePomodoro(false);
      animationRef.current?.pause()
    } finally {
      setLoading(false);
    }
  };

  const handlerStartPomodoro = async () => {
    try {
      const pomodoroParams = {
        breakTimeInMinutes: 5,
        timeToFocusInMinutes: 25,
      };
      const { endsAt, mode } = await StartPomodoro(pomodoroParams);
      const { title, description } =
        getPomodoroNotificationTitleAndDescription(mode);
      bookPomodoroAlarm({
        title,
        booksAt: endsAt,
        description,
      });
      animationRef.current?.play()
      
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
    animationRef.current?.stop()
  };

  return (
    <Container>
      <main className="flex flex-1 flex-col items-center justify-center">
        <ConditionalView visible={loading}>
          <span>Loading...</span>
        </ConditionalView>

        <ConditionalView visible={!loading}>
        <Lottie
        ref={animationRef}
        options={{
          ...LOTTIE_BASE_OPTIONS,
          animationData: time,
        }}
        height={LOTTIE_HEIGHT - 50}
        width={LOTTIE_WIDTH + 50}
      />
          <h2 className="font-regular text-lg text-zinc-900">
            {PomodoroViewModel.isBreakTimeMode(pomodoroMode)
              ? 'DESCANSO'
              : 'Mantenha o Foco'}
          </h2>
          <h1 className="my-2 font-bold text-5xl text-zinc-900 mb-4">{getFormattedTimer()}</h1>
          {hasActivePomodoro ? (
            // <BaseButton onClick={handlerStopPomodoro}>
            //   Stop Pomodoro{' '}
            // </BaseButton>
            <Stop size={54} onClick={handlerStopPomodoro}/>
          ) : (
            <Play size={54} onClick={handlerStartPomodoro}/>
            // <BaseButton onClick={handlerStartPomodoro}>
            //   Start Pomodoro{' '}
            // </BaseButton>
          )}
        </ConditionalView>
      </main>
    </Container>
  );
};

export default Home;
