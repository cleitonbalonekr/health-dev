import { PomodoroRepository } from '@/application/repositories/pomodoro-repository';
type Input = void;

type Output = void;

export type StopPomodoro = (input: Input) => Promise<Output>;

type Setup = (pomodoroRepository: PomodoroRepository) => StopPomodoro;

export const setupStopPomodoro: Setup = (pomodoroRepository) => async () => {
  await pomodoroRepository.removePomodoro();
};
