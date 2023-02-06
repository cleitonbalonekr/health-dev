import { Pomodoro } from '@/application/entities/pomodoro';
import { PomodoroRepository } from '@/application/repositories/pomodoro-repository';
import { PomodoroException } from '../entities/errors/pomodoro-exception';

type Input = {
  timeToFocusInMinutes: number;
  breakTimeInMinutes: number;
};

type Output = {
  endsAt: Date;
};

export type StartPomodoro = (input: Input) => Promise<Output>;

type Setup = (pomodoroRepository: PomodoroRepository) => StartPomodoro;

export const setupStartPomodoro: Setup =
  (pomodoroRepository) =>
  async ({ timeToFocusInMinutes, breakTimeInMinutes }: Input) => {
    const storedPomodoro = await pomodoroRepository.findPomodoro();
    const hasPomodoroInExecution =
      storedPomodoro &&
      storedPomodoro.wasStarted() &&
      !storedPomodoro.isExpired();
    if (hasPomodoroInExecution) {
      throw new PomodoroException('Already exists a pomodoro in execution');
    }
    const pomodoro = new Pomodoro({
      timeToFocusInMinutes,
      breakTimeInMinutes,
    });
    const endsAt = pomodoro.start();
    await pomodoroRepository.save(pomodoro);
    return { endsAt };
  };