import { setupStartPomodoroFocus,setupGetActivePomodoro } from '@/application/use-cases';
import { LocalStoragePomodoroRepository } from '@/infra/database/local-storage/repositories/local-storage-pomodoro-repository';
import Home from './index';

const localStoragePomodoroRepository = new LocalStoragePomodoroRepository();

const startPomodoroFocus = setupStartPomodoroFocus(localStoragePomodoroRepository)
const getActivePomodoro = setupGetActivePomodoro(localStoragePomodoroRepository)

export const MakeHome: React.FC = () => {
  return (
    <Home
      startPomodoroFocus={startPomodoroFocus}
      getActivePomodoro={getActivePomodoro}
    />
  );
};
