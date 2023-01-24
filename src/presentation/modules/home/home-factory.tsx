import { setupStartPomodoroFocus } from '@/application/use-cases/start-pomodoro-focus';
import { LocalStoragePomodoroRepository } from '@/infra/database/local-storage/repositories/local-storage-pomodoro-repository';
import Home from './index';

export const MakeHome: React.FC = () => {
  return (
    <Home
      startPomodoroFocus={setupStartPomodoroFocus(
        new LocalStoragePomodoroRepository()
      )}
    />
  );
};
