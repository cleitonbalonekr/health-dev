import { Pomodoro } from '@/application/entities/pomodoro';

export class ChromeStoragePomodoroMapper {
  static toChromeStorage(pomodoro: Pomodoro) {
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
    return new Pomodoro({
      ...jsonRaw,
      startsAt: jsonRaw.startsAt && new Date(jsonRaw.endsAt),
      endsAt: jsonRaw.endsAt && new Date(jsonRaw.endsAt),
    });
  }
}
