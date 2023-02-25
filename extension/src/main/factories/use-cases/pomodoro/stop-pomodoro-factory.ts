import { setupStopPomodoro } from '@/application/use-cases/pomodoro';
import { makeChromeStoragePomodoroRepository } from '@/main/factories/infra/repositories/chrome-storage';

export const makeStopPomodoro = () => {
  return setupStopPomodoro(makeChromeStoragePomodoroRepository());
};
