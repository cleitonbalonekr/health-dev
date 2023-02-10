import { Alarm } from '@/application/entities/alarm';
import { addMinutes } from '../../helpers';
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

  it('should return the diference in minutes to Alarm.booksAt', () => {
    const alarm = makeAlarm({
      booksAt: addMinutes(new Date(), 5),
    });

    const minutes = alarm.getMinutesRemaing();
    console.log(minutes);
    expect(minutes).toEqual(5);
  });
});
