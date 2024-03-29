import { Pomodoro } from '@/application/entities/pomodoro';
import { PomodoroRepository } from '@/application/repositories/pomodoro-repository';
import { ChromeStoragePomodoroMapper } from '../mappers/chrome-storage-pomodoro-mapper';

export class ChromeStoragePomodoroRepository implements PomodoroRepository {
  private key: string = '@HeathDev:Pomodoro';

  async findPomodoro(): Promise<Pomodoro | null> {
    const raw = await chrome.storage.session.get(this.key);
    if (!raw[this.key]) return null;
    return ChromeStoragePomodoroMapper.toPomodoro(raw[this.key]);
  }

  async save(pomodoro: Pomodoro): Promise<void> {
    const raw = ChromeStoragePomodoroMapper.toChromeStorage(pomodoro);
    await chrome.storage.session.set({ [this.key]: raw });
  }

  async removePomodoro(): Promise<void> {
    await chrome.storage.session.remove(this.key);
  }
}
