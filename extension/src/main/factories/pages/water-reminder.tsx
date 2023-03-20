import WaterReminder from '@/presentation/modules/water-reminder';
import {
  makeCalculeWaterReminder,
  makeGetWaterReminder,
} from '@/main/factories/use-cases/water-reminder';
import {
  makeStartWaterAlarm,
  makeStopAlarm,
} from '@/main/factories/use-cases/alarm';

export const makeWaterReminder = () => {
  return (
    <WaterReminder
      calculeWaterQuantityDay={makeCalculeWaterReminder()}
      getWaterQuantityDay={makeGetWaterReminder()}
      startWaterAlarm={makeStartWaterAlarm()}
      stopAlarm={makeStopAlarm()}
    />
  );
};
