import { Notification } from './notification';

export interface AlarmProps {
  booksAt: Date;
  repeatEveryMinutes?: number;
  notification: Notification;
}

export class Alarm {
  private props: AlarmProps;
  constructor(props: AlarmProps) {
    this.props = props;
  }

  public get booksAt() {
    return this.props.booksAt;
  }

  public get repeatEveryMinutes() {
    return this.props.repeatEveryMinutes;
  }

  public get notification() {
    return this.props.notification;
  }
}
