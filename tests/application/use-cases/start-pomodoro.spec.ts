import { PomodoroException } from '@/application/entities/errors/pomodoro-exception';
import { Pomodoro, POMODORO_MODE } from '@/application/entities/pomodoro';
import { PomodoroRepository } from '@/application/repositories/pomodoro-repository';
import { setupStartPomodoro, StartPomodoro } from '@/application/use-cases';
import { mock, MockProxy } from 'vitest-mock-extended';
import { subMinutes } from '../../helpers';
import { makePomodoro } from '../factories/pomodoro-factory';
vitest.useFakeTimers().setSystemTime(new Date());
describe('StartPomodoro', () => {
  const actualDate = new Date();

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
  it('Should start a pomodoro in breakTime if mode ios true and return the endsAt', async () => {
    const pomodoro = makePomodoro({
      startsAt: subMinutes(actualDate, 26),
      endsAt: subMinutes(actualDate, 1),
    });
    pomodoro.finishCicle();
    const { endsAt } = await sut(params);
    expect(pomodoro.mode).toEqual(POMODORO_MODE.BREAK_TIME);
    expect(endsAt).toEqual(expect.any(Date));
  });
  it('should call PomodoroRepository.save with correct values', async () => {
    await sut(params);
    const pomodoro = makePomodoro(params);
    pomodoro.start();
    expect(pomodoroRepository.save).toBeCalledTimes(1);
    expect(pomodoroRepository.save).toBeCalledWith(pomodoro);
  });
  it('should starts a pomodoro break time when has a finish pomodoro', async () => {
    const pomodoro = makePomodoro({
      startsAt: subMinutes(actualDate, 26),
      endsAt: subMinutes(actualDate, 1),
    });
    pomodoroRepository.findPomodoro.mockResolvedValueOnce(pomodoro);

    const response = await sut(params);

    expect(pomodoroRepository.findPomodoro).toBeCalledTimes(1);
    expect(pomodoro.mode).toBeTruthy();
    expect(response.endsAt).toEqual(expect.any(Date));
  });
});
