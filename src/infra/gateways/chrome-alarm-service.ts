import { Alarm, AlarmType } from '@/application/entities/alarm';
import { ChromeAlarm } from '@/application/gateways/chrome-alarm';
import { AlarmRepository } from '@/application/repositories/alarm-repository';
import { ChromeStorageAlarmRepository } from '../database/chrome-storage/repositories/chrome-storage-alarm-repository';

export class ChromeAlarmService implements ChromeAlarm {
  private chromeStorageAlarmRepository: AlarmRepository;
  constructor() {
    this.chromeStorageAlarmRepository = new ChromeStorageAlarmRepository();
    this.onAlarm();
  }

  bookAlarm(alarm: Alarm) {
    chrome.alarms.create({
      delayInMinutes: alarm.getMinutesRemaing(),
      periodInMinutes: alarm.repeatEveryMinutes,
    });
  }

  private onAlarm() {
    chrome.alarms.onAlarm.addListener(async () => {
      const storedAlarm = await this.chromeStorageAlarmRepository.getByType(
        AlarmType.POMODORO
      );
      if (storedAlarm) {
        const notification = storedAlarm.notification;
        chrome.notifications.create(
          {
            type: 'basic',
            iconUrl: notification.iconUrl,
            title: notification.title,
            message: notification.description,
            silent: false,
          },
          () => {}
        );
      }
    });
  }
}
