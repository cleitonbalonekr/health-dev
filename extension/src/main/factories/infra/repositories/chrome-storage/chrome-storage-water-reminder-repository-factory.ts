import { ChromeStorageWaterReminderRepository } from '@/infra/database/chrome-storage/repositories/chrome-storage-water-reminder-repository';

export const makeChromeStorageWaterReminderRepository = () => {
  return new ChromeStorageWaterReminderRepository();
};
