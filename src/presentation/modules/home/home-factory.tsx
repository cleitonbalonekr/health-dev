import {
  setupStartPomodoro,
  setupGetPomodoro,
  setupStopPomodoro,
} from '@/application/use-cases';
import { ChromeStoragePomodoroRepository } from '@/infra/database/chrome-storage/repositories/chrome-storage-pomodoro-repository';
import Home from './index';

const chromeStoragePomodoroRepository = new ChromeStoragePomodoroRepository();

const StartPomodoro = setupStartPomodoro(chromeStoragePomodoroRepository);
const GetPomodoro = setupGetPomodoro(chromeStoragePomodoroRepository);
const stopPomodoro = setupStopPomodoro(chromeStoragePomodoroRepository);

export const MakeHome: React.FC = () => {
  return (
    <Home
      StartPomodoro={StartPomodoro}
      GetPomodoro={GetPomodoro}
      stopPomodoro={stopPomodoro}
    />
  );
};
