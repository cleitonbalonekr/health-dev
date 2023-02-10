import { Alarm } from '@/application/entities/alarm';
import { Notification } from '@/application/entities/notification';
import { ChromeAlarm } from '@/application/gateways/chrome-alarm';

type Input = {
  booksAt: Date;
  title: string;
  description: string;
};

type Output = void;

export type BookPomodoroAlarm = (input: Input) => Output;

type Setup = (chromeAlarm: ChromeAlarm) => BookPomodoroAlarm;

export const setupBookPomodoroAlarm: Setup =
  (chromeAlarm) =>
  ({ booksAt, title, description }) => {
    const notification = new Notification({
      iconUrl: 'alarm.jpg',
      title,
      description,
    });
    const alarm = new Alarm({
      booksAt,
      notification,
    });
    chromeAlarm.bookAlarm(alarm);
  };
