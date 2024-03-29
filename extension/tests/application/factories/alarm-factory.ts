import { Alarm, AlarmProps, AlarmType } from '@/application/entities/alarm';
import { makeNotification } from './notification-factory';
type Override = Partial<AlarmProps>;

export const makeAlarm = (override?: Override) => {
  return new Alarm({
    booksAt: new Date(),
    repeatEveryMinutes: 5,
    notification: makeNotification(),
    type: AlarmType.POMODORO,
    ...override,
  });
};
