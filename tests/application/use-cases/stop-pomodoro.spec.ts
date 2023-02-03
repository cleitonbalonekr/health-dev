import { PomodoroException } from '@/application/entities/errors/pomodoro-exception';
import { Pomodoro } from '@/application/entities/pomodoro';
import { PomodoroRepository } from '@/application/repositories/pomodoro-repository';
import { setupStopPomodoro, StopPomodoro } from '@/application/use-cases';
import { mock, MockProxy } from 'vitest-mock-extended';
describe('StopPomodoro', () => {
  let sut: StopPomodoro;
  let pomodoroRepository: MockProxy<PomodoroRepository>;
  let params: any;
  beforeAll(() => {
    pomodoroRepository = mock();
  });
  beforeEach(() => {
    pomodoroRepository.save.mockResolvedValue();
    pomodoroRepository.findPomodoro.mockResolvedValue(null);
    sut = setupStopPomodoro(pomodoroRepository);
  });
  it('Should call removePomodo with correct values', async () => {
    const promise = await sut(params);
    expect(pomodoroRepository.removePomodoro).toBeCalledTimes(1);
  });
});
