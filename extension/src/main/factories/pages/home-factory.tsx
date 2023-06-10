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
import { makeLoadPreferences } from '@/main/factories/use-cases/preferences';

export const makeHome = () => {
  return (
    <Home
      StartPomodoro={makeStartPomodoro()}
      GetPomodoro={makeGetPomodoro()}
      stopPomodoro={makeStopPomodoro()}
      bookPomodoroAlarm={makeBookPomodoroAlarm()}
      stopAlarm={makeStopAlarm()}
      loadPreferences={makeLoadPreferences()}
    />
  );
};
