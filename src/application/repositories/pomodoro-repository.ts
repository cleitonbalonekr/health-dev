import { Pomodoro } from '@/application/entities/pomodoro';

export interface PomodoroRepository {
  save(pomodoro: Pomodoro): Promise<void>;
  findPomodoro(): Promise<Pomodoro | null>;
  removePomodoro(): Promise<void>;
}
