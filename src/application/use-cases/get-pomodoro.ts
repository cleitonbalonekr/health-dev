import { Pomodoro } from '@/application/entities/pomodoro';
import { PomodoroRepository } from '@/application/repositories/pomodoro-repository';
import { PomodoroException } from '../entities/errors/pomodoro-exception';
import { Replace } from '@/helpers/Replace';
type Input = void;

// type Output = Replace<Pomodoro, { endsAt: Date; startsAt: Date }>;
type Output = Pomodoro;

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
    return pomodoro;
  }
  return pomodoro;
};
