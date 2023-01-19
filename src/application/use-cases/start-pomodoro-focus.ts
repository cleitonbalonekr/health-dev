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

export type StartPomodoroFocus = (input: Input) => Promise<Output>;

type Setup = (pomodoroRepository: PomodoroRepository) => StartPomodoroFocus;

export const setupStartPomodoroFocus: Setup =
  (pomodoroRepository) =>
  async ({ timeToFocusInMinutes, breakTimeInMinutes }: Input) => {
    const inExecutionPomodoro = await pomodoroRepository.findOpenPomodoro();
    if (inExecutionPomodoro) {
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
