import { WaterGoal } from '@/application/entities/water-goal';
import { WaterReminderRepository } from '@/application/repositories/water-reminder-repository';
import { ChromeStorageWaterReminderMapper } from '../mappers/chrome-storage-water-reminder-mapper';

export class ChromeStorageWaterReminderRepository
  implements WaterReminderRepository
{
  private key: string = '@HeathDev:WaterReminder';

  async load(): Promise<WaterGoal | null> {
    const raw = await chrome.storage.local.get(this.key);
    if (!raw[this.key]) return null;
    return ChromeStorageWaterReminderMapper.toWaterGoal(raw[this.key]);
  }

  async save(waterQuantity: WaterGoal): Promise<void> {
    const raw = ChromeStorageWaterReminderMapper.toChromeStorage(waterQuantity);
    await chrome.storage.local.set({ [this.key]: raw });
  }
}
