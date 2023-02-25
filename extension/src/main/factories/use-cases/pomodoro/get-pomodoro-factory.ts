import { setupGetPomodoro } from '@/application/use-cases/pomodoro';
import { makeChromeStoragePomodoroRepository } from '@/main/factories/infra/repositories/chrome-storage';

export const makeGetPomodoro = () => {
  return setupGetPomodoro(makeChromeStoragePomodoroRepository());
};
