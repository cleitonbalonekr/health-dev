import { Alarm, AlarmType } from '@/application/entities/alarm';
import { Notification } from '@/application/entities/notification';
import { ChromeAlarm } from '@/application/gateways/chrome-alarm';
import { AlarmRepository } from '@/application/repositories/alarm-repository';

type Input = {
  booksAt: Date;
  title: string;
  description: string;
};

type Output = Alarm;

export type BookPomodoroAlarm = (input: Input) => Promise<Output>;

type Setup = (
  chromeAlarm: ChromeAlarm,
  alarmRepository: AlarmRepository
) => BookPomodoroAlarm;

export const setupBookPomodoroAlarm: Setup =
  (chromeAlarm, alarmRepository) =>
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
    chromeAlarm.bookAlarm(alarm);
    return alarm;
  };
