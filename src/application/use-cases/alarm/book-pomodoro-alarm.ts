import { Alarm, AlarmType } from '@/application/entities/alarm';
import { Notification } from '@/application/entities/notification';
import { AlarmService } from '@/application/gateways/alarm-service';
import { AlarmRepository } from '@/application/repositories/alarm-repository';

type Input = {
  booksAt: Date;
  title: string;
  description: string;
};

type Output = Alarm;

export type BookPomodoroAlarm = (input: Input) => Promise<Output>;

type Setup = (
  alarmService: AlarmService,
  alarmRepository: AlarmRepository
) => BookPomodoroAlarm;

export const setupBookPomodoroAlarm: Setup =
  (alarmService, alarmRepository) =>
  async ({ booksAt, title, description }) => {
    const notification = new Notification({
      iconUrl: 'alarm.jpg',
      title,
      description,
    });
    const alarm = new Alarm({
      booksAt,
      notification,
      type: AlarmType.POMODORO,
    });
    await alarmRepository.save(alarm);
    alarmService.bookAlarm({
      minutesRemaining: alarm.getMinutesRemaing(),
      id: alarm.type,
      repeatEveryMinutes: alarm.repeatEveryMinutes,
    });
    return alarm;
  };
