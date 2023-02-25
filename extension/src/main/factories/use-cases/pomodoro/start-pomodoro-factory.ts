import { setupStartPomodoro } from '@/application/use-cases/pomodoro';
import { makeChromeStoragePomodoroRepository } from '@/main/factories/infra/repositories/chrome-storage';

export const makeStartPomodoro = () => {
  return setupStartPomodoro(makeChromeStoragePomodoroRepository());
};
