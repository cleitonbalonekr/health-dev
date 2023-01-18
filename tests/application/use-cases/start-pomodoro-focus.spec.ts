import {
  setupStartPomodoroFocus,
  StartPomodoroFocus,
} from '@/application/use-cases/start-pomodoro-focus';

const makeStartPomodoroFocus = () => {
  return setupStartPomodoroFocus();
};

describe('StartPomodoroFocus', () => {
  it('Should start a pomodoro and return the endsAt', () => {
    const startPomodoroFocus = makeStartPomodoroFocus();
    const { endsAt } = startPomodoroFocus({
      breakTimeInMinutes: 5,
      timeToFocusInMinutes: 25,
    });
    expect(endsAt).toEqual(expect.any(Date));
  });
});
