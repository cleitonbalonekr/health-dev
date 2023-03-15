import { WaterGoal } from '@/application/entities/water-goal';
import { WaterReminderRepository } from '@/application/repositories/water-reminder-repository';

type Output = number;
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
    const waterGoal = new WaterGoal(waterNecessaryInLiters);
    await waterReminderRepository.save(waterGoal);
    return waterNecessaryInLiters;
  };
