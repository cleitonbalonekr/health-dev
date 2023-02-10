import { Alarm } from '@/application/entities/alarm';
import { makeAlarm } from '../factories/alarm-factory';

describe('Alarm', () => {
  it('should create a new Alarm with correct values', () => {
    const alarm = makeAlarm();
    expect(alarm).toBeInstanceOf(Alarm);
    expect(alarm).toMatchObject({
      booksAt: alarm.booksAt,
      notification: alarm.notification,
      repeatEveryMinutes: alarm.repeatEveryMinutes,
    });
  });
});
