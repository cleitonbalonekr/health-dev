import { WaterGoal } from '@/application/entities/water-goal';

export class ChromeStorageWaterReminderMapper {
  static toChromeStorage(waterGoal: WaterGoal) {
    return waterGoal.value;
  }
  static toWaterGoal(raw: any) {
    return new WaterGoal(raw);
  }
}
