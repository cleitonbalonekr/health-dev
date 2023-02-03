import { Pomodoro } from '@/application/entities/pomodoro';
import { PomodoroRepository } from '@/application/repositories/pomodoro-repository';
import { PomodoroException } from '../entities/errors/pomodoro-exception';
import { Replace } from '@/helpers/Replace';
type Input = void;

type Output = Replace<Pomodoro, { endsAt: Date; startsAt: Date }>;

export type GetActivePomodoro = (input: Input) => Promise<Output>;

type Setup = (pomodoroRepository: PomodoroRepository) => GetActivePomodoro;

export const setupGetActivePomodoro: Setup =
  (pomodoroRepository) => async () => {
    const actualDate = new Date();
    const pomodoro = await pomodoroRepository.findPomodoro();
    if (!pomodoro) {
      throw new PomodoroException('Pomodoro does not exists');
    }
    if (!pomodoro.wasStarted()) {
      throw new PomodoroException('Pomodoro was not started');
    }
    if (pomodoro.isExpired()) {
      throw new PomodoroException('Pomodoro is already finished');
    }
    return pomodoro as Output;
  };
