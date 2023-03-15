export interface WaterReminderRepository {
  save(waterQuantity: number): Promise<void>;
  load(): Promise<Number | null>;
}
