import { setupBookPomodoroAlarm } from '@/application/use-cases/alarm';
import { makeChromeAlarmService } from '@/main/factories/infra/gateways';
import { makeChromeStorageAlarmRepository } from '@/main/factories/infra/repositories/chrome-storage';

export const makeBookPomodoroAlarm = () => {
  return setupBookPomodoroAlarm(
    makeChromeAlarmService(),
    makeChromeStorageAlarmRepository()
  );
};
