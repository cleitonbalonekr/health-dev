import { Notification } from './notification';

export enum AlarmType {
  POMODORO = 'pomodoro',
}

export interface AlarmProps {
  booksAt: Date;
  repeatEveryMinutes?: number;
  type: AlarmType;
  notification: Notification;
}

export class Alarm {
  private props: AlarmProps;
  constructor(props: AlarmProps) {
    this.props = props;
  }

  public getMinutesRemaing() {
    const actualDate = new Date();
    const diferenceInMilisseconds =
      (this.booksAt.getTime() - actualDate.getTime()) / 1000;
    const diferenceInMinutes = diferenceInMilisseconds / 60;
    return Math.abs(Math.round(diferenceInMinutes));
  }

  public get booksAt() {
    return this.props.booksAt;
  }

  public get repeatEveryMinutes() {
    return this.props.repeatEveryMinutes;
  }

  public get type() {
    return this.props.type;
  }

  public get notification() {
    return this.props.notification;
  }
}
