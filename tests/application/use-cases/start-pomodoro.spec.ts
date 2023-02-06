import { PomodoroException } from '@/application/entities/errors/pomodoro-exception';
import { Pomodoro } from '@/application/entities/pomodoro';
import { PomodoroRepository } from '@/application/repositories/pomodoro-repository';
import { setupStartPomodoro, StartPomodoro } from '@/application/use-cases';
import { mock, MockProxy } from 'vitest-mock-extended';
import { makePomodoro } from '../factories/pomodoro-factory';
vitest.useFakeTimers().setSystemTime(new Date());
describe('StartPomodoro', () => {
  let sut: StartPomodoro;
  let pomodoroRepository: MockProxy<PomodoroRepository>;
  let params: any;
  beforeAll(() => {
    pomodoroRepository = mock();
    params = {
      breakTimeInMinutes: 5,
      timeToFocusInMinutes: 25,
    };
  });
  beforeEach(() => {
    pomodoroRepository.save.mockResolvedValue();
    pomodoroRepository.findPomodoro.mockResolvedValue(null);
    sut = setupStartPomodoro(pomodoroRepository);
  });
  it('Should start a pomodoro and return the endsAt', async () => {
    const { endsAt } = await sut(params);
    expect(endsAt).toEqual(expect.any(Date));
  });
  it('should call PomodoroRepository.save with correct values', async () => {
    await sut(params);
    const pomodoro = makePomodoro(params);
    pomodoro.start();
    expect(pomodoroRepository.save).toBeCalledTimes(1);
    expect(pomodoroRepository.save).toBeCalledWith(pomodoro);
  });
  it('should trhows an PomodoroException if already exists a pomodoro in execution', async () => {
    const pomodoro = makePomodoro(params);
    pomodoro.start();
    pomodoroRepository.findPomodoro.mockResolvedValueOnce(pomodoro);
    const promise = sut(params);
    expect(pomodoroRepository.findPomodoro).toBeCalledTimes(1);
    await expect(promise).rejects.toThrow(
      new PomodoroException('Already exists a pomodoro in execution')
    );
  });
});
