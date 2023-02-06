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

    if (!storedPomodoro || !storedPomodoro.wasStarted()) {
      const pomodoro = new Pomodoro({
        timeToFocusInMinutes,
        breakTimeInMinutes,
      });
      const endsAt = pomodoro.start();
      await pomodoroRepository.save(pomodoro);
      return { endsAt };
    }

    if (!storedPomodoro.isExpired()) {
      throw new PomodoroException('Already exists a pomodoro in execution');
    }

    storedPomodoro.endFocus();
    const endsAt = storedPomodoro.start();
    await pomodoroRepository.save(storedPomodoro);
    return { endsAt };
  };
