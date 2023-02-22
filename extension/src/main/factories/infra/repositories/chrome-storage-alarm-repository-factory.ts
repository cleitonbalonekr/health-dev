import { ChromeStorageAlarmRepository } from '@/infra/database/chrome-storage/repositories/chrome-storage-alarm-repository';

export const makeChromeStorageAlarmRepository = () => {
  return new ChromeStorageAlarmRepository();
};
