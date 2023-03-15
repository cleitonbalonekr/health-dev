import { WaterGoal } from '@/application/entities/water-goal';

export interface WaterReminderRepository {
  save(waterQuantity: WaterGoal): Promise<void>;
  load(): Promise<WaterGoal | null>;
}
