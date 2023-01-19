import { Pomodoro } from '@/application/entities/pomodoro';

export interface PomodoroRepository {
  save(pomodoro: Pomodoro): Promise<void>;
  findOpenPomodoro(): Promise<Pomodoro | null>;
}
