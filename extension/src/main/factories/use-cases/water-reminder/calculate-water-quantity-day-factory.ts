import { setupCalculeWaterQuantityDay } from '@/application/use-cases/water-reminder';
import { makeChromeStorageWaterReminderRepository } from '@/main/factories/infra/repositories/chrome-storage';

export const makeCalculeWaterReminder = () => {
  return setupCalculeWaterQuantityDay(
    makeChromeStorageWaterReminderRepository()
  );
};
