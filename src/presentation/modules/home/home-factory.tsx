import { setupStartPomodoroFocus } from '@/application/use-cases/start-pomodoro-focus';
import Home from './index';

export const MakeHome: React.FC = () => {
  return <Home startPomodoroFocus={setupStartPomodoroFocus()} />;
};
