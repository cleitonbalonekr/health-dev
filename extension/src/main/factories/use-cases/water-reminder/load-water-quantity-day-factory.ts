import { setupGetWaterQuantityDay } from '@/application/use-cases/water-reminder';
import { makeChromeStorageWaterReminderRepository } from '@/main/factories/infra/repositories/chrome-storage';

export const makeGetWaterReminder = () => {
  return setupGetWaterQuantityDay(makeChromeStorageWaterReminderRepository());
};
