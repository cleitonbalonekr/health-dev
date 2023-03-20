import { setupVerifyExistentAlarm } from '@/application/use-cases/alarm';
import { makeChromeStorageAlarmRepository } from '@/main/factories/infra/repositories/chrome-storage';

export const makeVerifyExistentAlarm = () => {
  return setupVerifyExistentAlarm(makeChromeStorageAlarmRepository());
};
