import { WaterReminderRepository } from '@/application/repositories/water-reminder-repository';

export class ChromeStorageWaterReminderRepository
  implements WaterReminderRepository
{
  private key: string = '@HeathDev:WaterReminder';

  async load(): Promise<Number | null> {
    const raw = await chrome.storage.local.get(this.key);
    if (!raw[this.key]) return null;
    return raw[this.key];
  }

  async save(waterQuantity: Number): Promise<void> {
    await chrome.storage.local.set({ [this.key]: waterQuantity });
  }
}
