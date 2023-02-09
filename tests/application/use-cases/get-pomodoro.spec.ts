import { PomodoroException } from '@/application/entities/errors/pomodoro-exception';
import { Pomodoro, POMODORO_MODE } from '@/application/entities/pomodoro';
import { PomodoroRepository } from '@/application/repositories/pomodoro-repository';
import { setupGetPomodoro, GetPomodoro } from '@/application/use-cases';
import { mock, MockProxy } from 'vitest-mock-extended';
import { subMinutes } from '../../helpers';
import { makePomodoro } from '../factories/pomodoro-factory';
describe('GetPomodoro', () => {
  let sut: GetPomodoro;
  let pomodoroRepository: MockProxy<PomodoroRepository>;
  let params: any;
  beforeAll(() => {
    pomodoroRepository = mock();
  });
  beforeEach(() => {
    pomodoroRepository.save.mockResolvedValue();
    pomodoroRepository.findPomodoro.mockResolvedValue(null);
    sut = setupGetPomodoro(pomodoroRepository);
  });
  it('Should return PomodoroException if a open pomodoro does not exist', async () => {
    const promise = sut(params);
    await expect(promise).rejects.toThrow(
      new PomodoroException('Pomodoro does not exists')
    );
  });
  it('Should return PomodoroException if endsAt not set', async () => {
    pomodoroRepository.findPomodoro.mockResolvedValueOnce(makePomodoro());
    const promise = sut(params);
    await expect(promise).rejects.toThrow(
      new PomodoroException('Pomodoro was not started')
    );
  });
  it('Should return a finished Pomodoro if endsAt is finished', async () => {
    const pomodoro = makePomodoro();
    vitest.useFakeTimers().setSystemTime(subMinutes(new Date(), 25));
    pomodoro.start();
    vitest.clearAllTimers();
    pomodoroRepository.findPomodoro.mockResolvedValueOnce(pomodoro);

    const { endsAt, mode } = await sut(params);

    expect(endsAt).toBeNull();
    expect(mode).toBe(POMODORO_MODE.BREAK_TIME);
  });
  it('Should return a pomodoro if ends at is not finished', async () => {
    const pomodoro = makePomodoro();
    pomodoro.start();
    pomodoroRepository.findPomodoro.mockResolvedValueOnce(pomodoro);
    const { endsAt } = await sut(params);
    expect(endsAt).toEqual(pomodoro.endsAt);
  });
});
