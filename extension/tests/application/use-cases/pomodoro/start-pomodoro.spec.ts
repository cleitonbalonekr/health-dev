import { POMODORO_MODE } from '@/application/entities/pomodoro';
import { PomodoroRepository } from '@/application/repositories/pomodoro-repository';
import {
  setupStartPomodoro,
  StartPomodoro,
} from '@/application/use-cases/pomodoro';
import { mock, MockProxy, mockReset } from 'vitest-mock-extended';
import { subMinutes } from '@/tests/helpers';
import { makePomodoro } from '@/tests/application/factories/pomodoro-factory';
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
    mockReset(pomodoroRepository);
    pomodoroRepository.save.mockResolvedValue();
    pomodoroRepository.findPomodoro.mockResolvedValue(null);
    sut = setupStartPomodoro(pomodoroRepository);
  });
  it('Should start a pomodoro and return the endsAt and pomodoro mode', async () => {
    const { endsAt, mode } = await sut(params);
    expect(endsAt).toEqual(expect.any(Date));
    expect(mode).toEqual(POMODORO_MODE.FOCUS);
  });
  it('Should start a pomodoro in BREAK_TIME mode is FOCUS mode was expired', async () => {
    const pomodoro = makePomodoro({
      startsAt: subMinutes(actualDate, 26),
      endsAt: subMinutes(actualDate, 1),
    });
    pomodoroRepository.findPomodoro.mockResolvedValue(pomodoro);

    const { endsAt, mode } = await sut(params);
    expect(mode).toEqual(POMODORO_MODE.BREAK_TIME);
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
