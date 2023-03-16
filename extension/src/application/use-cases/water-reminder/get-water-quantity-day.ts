import { WaterReminderRepository } from '@/application/repositories/water-reminder-repository';

type Output = number | null;

export type GetWaterQuantityDay = () => Promise<Output>;

type Setup = (
  waterReminderRepository: WaterReminderRepository
) => GetWaterQuantityDay;

export const setupGetWaterQuantityDay: Setup =
  (waterReminderRepository) => async () => {
    const waterNecessaryInLiters = await waterReminderRepository.load();
    return waterNecessaryInLiters ? waterNecessaryInLiters.value : null;
  };
