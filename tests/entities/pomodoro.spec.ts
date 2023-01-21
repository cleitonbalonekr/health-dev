import { makePomodoro } from '../application/factories/pomodoro-factory';

const addMinutes = (date: Date, minutes: number) => {
  date.setMinutes(date.getMinutes() + minutes);
  return date;
};

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
    const pomodoro = makePomodoro();

    const endsAt = pomodoro.start();

    expect(pomodoro.startsAt).toEqual(expect.any(Date));
    const pomodoroStartsAt = pomodoro.startsAt as Date;
    expect(endsAt).toEqual(
      addMinutes(pomodoroStartsAt, pomodoro.timeToFocusInMinutes)
    );
  });
});
