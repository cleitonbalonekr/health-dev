import { PomodoroException } from '@/application/entities/errors/pomodoro-exception';
import { Pomodoro } from '@/application/entities/pomodoro';
import { PomodoroRepository } from '@/application/repositories/pomodoro-repository';
import {
  setupGetActivePomodoro,
  GetActivePomodoro,
} from '@/application/use-cases/get-active-pomodoro';
import { mock, MockProxy } from 'vitest-mock-extended';
import { subMinutes } from '../../helpers';
import { makePomodoro } from '../factories/pomodoro-factory';
describe('GetActivePomodoro', () => {
  let sut: GetActivePomodoro;
  let pomodoroRepository: MockProxy<PomodoroRepository>;
  let params: any;
  beforeAll(() => {
    pomodoroRepository = mock();
  });
  beforeEach(() => {
    pomodoroRepository.save.mockResolvedValue();
    pomodoroRepository.findOpenPomodoro.mockResolvedValue(null);
    sut = setupGetActivePomodoro(pomodoroRepository);
  });
  it('Should return null if a open pomodoro does not exist', async () => {
    const promise = sut(params);
    await expect(promise).rejects.toThrow(
      new PomodoroException('Pomodoro does not exists')
    );
  });
  it('Should return null if endsAt not set', async () => {
    pomodoroRepository.findOpenPomodoro.mockResolvedValueOnce(makePomodoro());
    const promise = sut(params);
    await expect(promise).rejects.toThrow(
      new PomodoroException('Pomodoro was not started')
    );
  });
  it('Should return null if endsAt is finished', async () => {
    const pomodoro = makePomodoro();
    vitest.useFakeTimers().setSystemTime(subMinutes(new Date(), 25));
    pomodoro.start();
    vitest.clearAllTimers();
    pomodoroRepository.findOpenPomodoro.mockResolvedValueOnce(pomodoro);

    const promise = sut(params);

    await expect(promise).rejects.toThrow(
      new PomodoroException('Pomodoro is already finished')
    );
  });
  it('Should return a pomodoro if ends at is not finished', async () => {
    const pomodoro = makePomodoro();
    pomodoro.start();
    pomodoroRepository.findOpenPomodoro.mockResolvedValueOnce(pomodoro);
    const response = await sut(params);
    expect(response).toBeInstanceOf(Pomodoro);
  });
});
