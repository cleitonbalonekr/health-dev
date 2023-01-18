import { Pomodoro } from '@/application/entities/pomodoro';

type Input = {
  timeToFocusInMinutes: number;
  breakTimeInMinutes: number;
};

type Output = {
  endsAt: Date;
};

export type StartPomodoroFocus = (input: Input) => Output;

type Setup = () => StartPomodoroFocus;

export const setupStartPomodoroFocus: Setup =
  () =>
  ({ timeToFocusInMinutes, breakTimeInMinutes }: Input) => {
    const pomodoro = new Pomodoro({
      timeToFocusInMinutes,
      breakTimeInMinutes,
    });
    const endsAt = pomodoro.start();

    return { endsAt };
  };
