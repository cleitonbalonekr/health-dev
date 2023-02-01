import { setupStartPomodoroFocus,setupGetActivePomodoro } from '@/application/use-cases';
import { ChromeStoragePomodoroRepository } from '@/infra/database/chrome-storage/repositories/chrome-storage-pomodoro-repository';
import Home from './index';

const chromeStoragePomodoroRepository = new ChromeStoragePomodoroRepository();

const startPomodoroFocus = setupStartPomodoroFocus(chromeStoragePomodoroRepository)
const getActivePomodoro = setupGetActivePomodoro(chromeStoragePomodoroRepository)

export const MakeHome: React.FC = () => {
  return (
    <Home
      startPomodoroFocus={startPomodoroFocus}
      getActivePomodoro={getActivePomodoro}
    />
  );
};
