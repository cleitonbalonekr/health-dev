import { ChromeStoragePomodoroRepository } from '@/infra/database/chrome-storage/repositories/chrome-storage-pomodoro-repository';

export const makeChromeStoragePomodoroRepository = () => {
  return new ChromeStoragePomodoroRepository();
};
