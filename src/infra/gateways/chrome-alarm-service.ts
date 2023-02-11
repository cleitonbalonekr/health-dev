import { Alarm } from '@/application/entities/alarm';
import { ChromeAlarm } from '@/application/gateways/chrome-alarm';

export class ChromeAlarmService implements ChromeAlarm {
  private alarm: Alarm | null = null;
  constructor() {
    this.onAlarm();
  }

  bookAlarm(alarm: Alarm) {
    this.alarm = alarm;
    chrome.alarms.create('pomodoro', {
      delayInMinutes: 1,
      // periodInMinutes: alarm.repeatEveryMinutes,
    });
  }

  private onAlarm() {
    chrome.alarms.onAlarm.addListener((alarm) => {
      const { iconUrl, title, description } = this.getNotification();
      console.log('notification', { iconUrl, title, description });
      chrome.notifications.create(
        {
          type: 'basic',
          iconUrl: iconUrl,
          title: title,
          message: description,
          silent: false,
        },
        () => {}
      );
    });
  }
  private getNotification() {
    if (!this.alarm) {
      throw new Error('alarm not defined');
    }
    return this.alarm.notification;
  }
}
