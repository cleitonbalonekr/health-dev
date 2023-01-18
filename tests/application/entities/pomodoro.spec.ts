import { Pomodoro } from '@/application/entities/pomodoro';
import { makePomodoro } from '../factories/pomodoro-factory';

describe('Pomodoro', () => {
  it('should create a new pomodoro with correct values', () => {
    const pomodoro = makePomodoro();

    expect(pomodoro).toMatchObject({
      breakTimeInMinutes: 5,
      timeToFocusInMinutes: 25,
      isBreakTime: false,
      finished: false,
    });
    expect(pomodoro.startsAt).toBeUndefined();
  });

  it('should starts a pomodoro', () => {
    const pomodoro = makePomodoro({
      timeToFocusInMinutes: 0.1,
    });

    pomodoro.start();

    expect(pomodoro.startsAt).toEqual(expect.any(Date));
    // console.log(pomodoro.timeToFocusInMinutes);
  });
});
