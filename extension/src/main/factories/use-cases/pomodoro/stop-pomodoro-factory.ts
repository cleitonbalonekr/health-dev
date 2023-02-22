import { setupStopPomodoro } from '@/application/use-cases/pomodoro';
import { makeChromeStoragePomodoroRepository } from '@/main/factories/infra/repositories';

export const makeStopPomodoro = () => {
  return setupStopPomodoro(makeChromeStoragePomodoroRepository());
};
