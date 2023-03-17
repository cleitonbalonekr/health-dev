import { Alarm, AlarmProps, AlarmType } from '@/application/entities/alarm';
import { Notification } from '@/application/entities/notification';
import { AlarmService } from '@/application/gateways/alarm-service';
import { AlarmRepository } from '@/application/repositories/alarm-repository';

type Output = {
  alarm: AlarmProps;
};
export type StartWaterAlarm = () => Promise<Output>;

type Setup = (
  alarmService: AlarmService,
  alarmRepository: AlarmRepository
) => StartWaterAlarm;

const timeToReminderInMinutes = 60 * 1.5;

export const setupStartWaterAlarm: Setup =
  (alarmService, alarmRepository) => async () => {
    const actualDate = new Date();
    actualDate.setMinutes(actualDate.getMinutes() + 2);
    const alarm = new Alarm({
      type: AlarmType.WATER_REMINDER,
      repeatEveryMinutes: timeToReminderInMinutes,
      booksAt: actualDate,
      notification: new Notification({
        title: 'É hora de beber água!',
        description: 'Beba 150ml de água',
        iconUrl: 'alarm.jpg',
      }),
    });
    alarmService.bookAlarm({
      minutesRemaining: alarm.getMinutesRemaining(),
      id: alarm.type,
      repeatEveryMinutes: alarm.repeatEveryMinutes,
    });
    await alarmRepository.save(alarm);
    return {
      alarm: {
        notification: alarm.notification,
        type: alarm.type,
        repeatEveryMinutes: alarm.repeatEveryMinutes,
        booksAt: alarm.booksAt,
      },
    };
  };
