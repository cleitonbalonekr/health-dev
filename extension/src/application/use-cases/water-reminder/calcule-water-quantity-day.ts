import { WaterReminderRepository } from '@/application/repositories/water-reminder-repository';

type Output = any;
type Input = {
  weight: number;
};

export type CalculeWaterQuantityDay = (input: Input) => Promise<Output>;

type Setup = (
  waterReminderRepository: WaterReminderRepository
) => CalculeWaterQuantityDay;

export const setupCalculeWaterQuantityDay: Setup =
  (waterReminderRepository) =>
  async ({ weight }) => {
    const waterInMlPerLiter = 35;
    const waterNecessaryInMl = weight * waterInMlPerLiter;
    const waterNecessaryInLiters = Number(
      (waterNecessaryInMl / 1000).toFixed(3)
    );
    await waterReminderRepository.save(waterNecessaryInLiters);
    return waterNecessaryInLiters;
  };
