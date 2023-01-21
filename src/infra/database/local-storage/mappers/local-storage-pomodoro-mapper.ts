import { Pomodoro } from '@/application/entities/pomodoro';

export class LocalStoragePomodoroMapper {
  static toLocalStorage(pomodoro: Pomodoro) {
    return JSON.stringify({
      timeToFocusInMinutes: pomodoro.timeToFocusInMinutes,
      breakTimeInMinutes: pomodoro.breakTimeInMinutes,
      isBreakTime: pomodoro.isBreakTime,
      finished: pomodoro.finished,
      startsAt: pomodoro.startsAt,
      endsAt: pomodoro.endsAt,
    });
  }
  static toPomodoro(raw: any) {
    const jsonRaw = JSON.parse(raw);
    return new Pomodoro(jsonRaw);
  }
}
