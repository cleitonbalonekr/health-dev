import { setupStopAlarm } from '@/application/use-cases/alarm';
import { makeChromeAlarmService } from '@/main/factories/infra/gateways';
import { makeChromeStorageAlarmRepository } from '@/main/factories/infra/repositories/chrome-storage';

export const makeStopAlarm = () => {
  return setupStopAlarm(
    makeChromeAlarmService(),
    makeChromeStorageAlarmRepository()
  );
};
