import { Pomodoro } from '@/application/entities/pomodoro';
import { PomodoroRepository } from '@/application/repositories/pomodoro-repository';
import { PomodoroException } from '../entities/errors/pomodoro-exception';
type Input = void;

type Output = void;

export type StopPomodoro = (input: Input) => Promise<Output>;

type Setup = (pomodoroRepository: PomodoroRepository) => StopPomodoro;

export const setupStopPomodoro: Setup = (pomodoroRepository) => async () => {};
