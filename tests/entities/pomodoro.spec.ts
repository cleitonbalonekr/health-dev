import { PomodoroException } from '@/application/entities/errors/pomodoro-exception';
import { POMODORO_MODE } from '@/application/entities/pomodoro';
import { makePomodoro } from '../application/factories/pomodoro-factory';
import { addMinutes, subMinutes } from '../helpers';

describe('Pomodoro', () => {
  const actualDate = new Date();

  it('should create a new pomodoro with correct values', () => {
    const pomodoro = makePomodoro();

    expect(pomodoro).toMatchObject({
      breakTimeInMinutes: 5,
      timeToFocusInMinutes: 25,
      mode: POMODORO_MODE.FOCUS,
    });
    expect(pomodoro.startsAt).toBeUndefined();
  });

  it('should starts a pomodoro in break time mode', () => {
    const pomodoro = makePomodoro({
      startsAt: subMinutes(actualDate, 26),
      endsAt: subMinutes(actualDate, 1),
    });

    pomodoro.finishCicle();
    const endsAt = pomodoro.start();
    expect(pomodoro.startsAt).toEqual(expect.any(Date));
    const pomodoroStartsAt = pomodoro.startsAt as Date;
    expect(endsAt).toEqual(
      addMinutes(pomodoroStartsAt, pomodoro.breakTimeInMinutes)
    );
  });
  it('should starts a pomodoro', () => {
    const pomodoro = makePomodoro();

    const endsAt = pomodoro.start();

    expect(pomodoro.startsAt).toEqual(expect.any(Date));
    const pomodoroStartsAt = pomodoro.startsAt as Date;
    expect(endsAt).toEqual(
      addMinutes(pomodoroStartsAt, pomodoro.timeToFocusInMinutes)
    );
  });

  describe('wasStarted', () => {
    it('should return true when pomodoro was stated', () => {
      const pomodoro = makePomodoro();

      pomodoro.start();

      expect(pomodoro.wasStarted()).toBeTruthy();
    });
    it('should return false when pomodoro was stated', () => {
      const pomodoro = makePomodoro();

      expect(pomodoro.wasStarted()).toBeFalsy();
    });
  });

  describe('isEspired', () => {
    it('should throw an PomodoroException when pomodoro was not started', () => {
      const pomodoro = makePomodoro();

      expect(pomodoro.isExpired.bind(pomodoro)).toThrow(
        new PomodoroException('Pomodoro was not started')
      );
    });
    it('should return true when pomodoro expired', () => {
      const pomodoro = makePomodoro({
        startsAt: subMinutes(actualDate, 26),
        endsAt: subMinutes(actualDate, 1),
      });
      expect(pomodoro.isExpired()).toBeTruthy();
    });
    it('should return false when pomodoro is not espired', () => {
      const pomodoro = makePomodoro();
      pomodoro.start();
      expect(pomodoro.isExpired()).toBeFalsy();
    });
  });

  describe('finishCicle', () => {
    it('should thows a PomodoroException when try to end when  is not finished', () => {
      const pomodoro = makePomodoro();
      pomodoro.start();

      expect(pomodoro.finishCicle.bind(pomodoro)).toThrow(
        new PomodoroException('Pomodoro is not finished')
      );
    });
    it('should set mode to BREAK_TIME and reset time when pomodo is in focus mode', () => {
      const pomodoro = makePomodoro({
        startsAt: subMinutes(actualDate, 26),
        endsAt: subMinutes(actualDate, 1),
      });

      pomodoro.finishCicle();

      expect(pomodoro.mode).toEqual(POMODORO_MODE.BREAK_TIME);
      expect(pomodoro.startsAt).toBeNull();
      expect(pomodoro.endsAt).toBeNull();
    });
    it('should set mode to FOCUS and reset time when pomodo is in break time mode', () => {
      const pomodoro = makePomodoro({
        startsAt: subMinutes(actualDate, 26),
        endsAt: subMinutes(actualDate, 1),
        mode: POMODORO_MODE.BREAK_TIME,
      });

      pomodoro.finishCicle();

      expect(pomodoro.mode).toEqual(POMODORO_MODE.FOCUS);
      expect(pomodoro.startsAt).toBeNull();
      expect(pomodoro.endsAt).toBeNull();
    });
  });
});
