import { POMODORO_MODE } from '@/application/entities/pomodoro';
import { PomodoroRepository } from '@/application/repositories/pomodoro-repository';
import { PomodoroException } from '../entities/errors/pomodoro-exception';

type Input = void;
type Output = {
  endsAt?: Date | null;
  mode: POMODORO_MODE;
};

export type GetPomodoro = (input: Input) => Promise<Output>;

type Setup = (pomodoroRepository: PomodoroRepository) => GetPomodoro;

export const setupGetPomodoro: Setup = (pomodoroRepository) => async () => {
  const pomodoro = await pomodoroRepository.findPomodoro();
  if (!pomodoro) {
    throw new PomodoroException('Pomodoro does not exists');
  }
  if (!pomodoro.wasStarted()) {
    throw new PomodoroException('Pomodoro was not started');
  }
  if (pomodoro.isExpired()) {
    pomodoro.finishCicle();
    return {
      endsAt: pomodoro.endsAt,
      mode: pomodoro.mode,
    };
  }
  return {
    endsAt: pomodoro.endsAt,
    mode: pomodoro.mode,
  };
};
