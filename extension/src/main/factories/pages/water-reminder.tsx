import WaterReminder from '@/presentation/modules/water-reminder';
import { makeCalculeWaterReminder } from '@/main/factories/use-cases/water-reminder';

export const makeWaterReminder = () => {
  return <WaterReminder calculeWaterQuantityDay={makeCalculeWaterReminder()} />;
};
