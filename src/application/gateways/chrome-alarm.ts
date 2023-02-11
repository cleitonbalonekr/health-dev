import { Alarm } from '../entities/alarm';

export interface ChromeAlarm {
  bookAlarm(alarm: Alarm): any;
}
