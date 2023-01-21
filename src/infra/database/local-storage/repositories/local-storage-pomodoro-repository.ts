import { Pomodoro } from '@/application/entities/pomodoro';
import { PomodoroRepository } from '@/application/repositories/pomodoro-repository';
import { LocalStoragePomodoroMapper } from '../mappers/local-storage-pomodoro-mapper';

export class LocalStoragePomodoroRepository implements PomodoroRepository {
  private key: string = '@HelthDev:Pomodoro';
  async save(pomodoro: Pomodoro): Promise<void> {
    const raw = LocalStoragePomodoroMapper.toLocalStorage(pomodoro);
    localStorage.setItem(this.key, raw);
  }
  async findOpenPomodoro(): Promise<Pomodoro | null> {
    const raw = localStorage.getItem(this.key);
    if (!raw) return null;
    return LocalStoragePomodoroMapper.toPomodoro(raw);
  }
}
