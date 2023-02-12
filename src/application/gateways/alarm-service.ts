export interface AlarmService {
  bookAlarm(alarm: AlarmService.Input): AlarmService.Output;
}
export namespace AlarmService {
  export type Input = {
    minutesRemaining: number;
    repeatEveryMinutes?: number;
    id: string;
  };

  export type Output = void;
}
