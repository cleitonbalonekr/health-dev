import { Pomodoro, PomodoroProps } from '@/application/entities/pomodoro';

type Override = Partial<PomodoroProps>;

export function makePomodoro(override: Override = {}) {
  return new Pomodoro({
    breakTimeInMinutes: 5,
    timeToFocusInMinutes: 25,
    ...override,
  });
}
