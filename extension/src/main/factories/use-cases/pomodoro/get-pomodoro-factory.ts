import { setupGetPomodoro } from '@/application/use-cases/pomodoro';
import { makeChromeStoragePomodoroRepository } from '@/main/factories/infra/repositories';

export const makeGetPomodoro = () => {
  return setupGetPomodoro(makeChromeStoragePomodoroRepository());
};