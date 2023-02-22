import { setupStartPomodoro } from '@/application/use-cases/pomodoro';
import { makeChromeStoragePomodoroRepository } from '@/main/factories/infra/repositories';

export const makeStartPomodoro = () => {
  return setupStartPomodoro(makeChromeStoragePomodoroRepository());
};
