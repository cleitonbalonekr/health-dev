import {
  setupStartPomodoro,
  setupGetPomodoro,
  setupStopPomodoro,
} from '@/application/use-cases/pomodoro';
import { setupBookPomodoroAlarm } from '@/application/use-cases/alarm';
import { ChromeStoragePomodoroRepository } from '@/infra/database/chrome-storage/repositories/chrome-storage-pomodoro-repository';
import Home from './index';
import { ChromeAlarmService } from '@/infra/gateways/chrome-alarm-service';
import { ChromeStorageAlarmRepository } from '@/infra/database/chrome-storage/repositories/chrome-storage-alarm-repository';

const chromeStoragePomodoroRepository = new ChromeStoragePomodoroRepository();
const chromeStorageAlarmRepository = new ChromeStorageAlarmRepository();
const chromeAlarmService = new ChromeAlarmService();

const StartPomodoro = setupStartPomodoro(chromeStoragePomodoroRepository);
const GetPomodoro = setupGetPomodoro(chromeStoragePomodoroRepository);
const stopPomodoro = setupStopPomodoro(chromeStoragePomodoroRepository);
const bookPomodoroAlarm = setupBookPomodoroAlarm(
  chromeAlarmService,
  chromeStorageAlarmRepository
);

export const MakeHome: React.FC = () => {
  return (
    <Home
      StartPomodoro={StartPomodoro}
      GetPomodoro={GetPomodoro}
      stopPomodoro={stopPomodoro}
      bookPomodoroAlarm={bookPomodoroAlarm}
    />
  );
};
