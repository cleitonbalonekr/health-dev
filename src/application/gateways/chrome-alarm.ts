type Props = {
  minutesRemaining: number;
  repeatEveryMinutes?: number;
  id?: string;
};
export interface ChromeAlarm {
  bookAlarm(alarm: Props): void;
}
