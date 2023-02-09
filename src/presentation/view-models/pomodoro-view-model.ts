import { Pomodoro, POMODORO_MODE } from '@/application/entities/pomodoro';

export class PomodoroViewModel {
  static isFocusMode(mode: POMODORO_MODE) {
    return mode === POMODORO_MODE.FOCUS;
  }

  static isBreakTimeMode(mode: POMODORO_MODE) {
    return mode === POMODORO_MODE.BREAK_TIME;
  }

  static MODE: POMODORO_MODE;
  static toPresentation(pomodoro: Pomodoro) {
    const { mode, endsAt, breakTimeInMinutes, startsAt, timeToFocusInMinutes } =
      pomodoro;
    return {
      mode,
      endsAt,
      breakTimeInMinutes,
      startsAt,
      timeToFocusInMinutes,
    };
  }
}
