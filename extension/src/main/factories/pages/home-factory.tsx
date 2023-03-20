import Home from '@/presentation/modules/home';
import {
  makeBookPomodoroAlarm,
  makeStopAlarm,
} from '@/main/factories/use-cases/alarm';
import {
  makeGetPomodoro,
  makeStartPomodoro,
  makeStopPomodoro,
} from '@/main/factories/use-cases/pomodoro';

export const makeHome = () => {
  return (
    <Home
      StartPomodoro={makeStartPomodoro()}
      GetPomodoro={makeGetPomodoro()}
      stopPomodoro={makeStopPomodoro()}
      bookPomodoroAlarm={makeBookPomodoroAlarm()}
      stopAlarm={makeStopAlarm()}
    />
  );
};
