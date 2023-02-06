import { PomodoroException } from '@/application/entities/errors/pomodoro-exception';
import { makePomodoro } from '../application/factories/pomodoro-factory';
import { addMinutes, subMinutes } from '../helpers';

describe('Pomodoro', () => {
  it('should create a new pomodoro with correct values', () => {
    const pomodoro = makePomodoro();

    expect(pomodoro).toMatchObject({
      breakTimeInMinutes: 5,
      timeToFocusInMinutes: 25,
      isBreakTime: false,
    });
    expect(pomodoro.startsAt).toBeUndefined();
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
      const actualDate = new Date();
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
});
