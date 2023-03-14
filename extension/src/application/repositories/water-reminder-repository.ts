export interface WaterReminderRepository {
  save(waterQuantity: number): Promise<boolean>;
}
