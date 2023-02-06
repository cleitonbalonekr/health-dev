import { Replace } from '@/helpers/Replace';
import { PomodoroException } from './errors/pomodoro-exception';

export interface PomodoroProps {
  timeToFocusInMinutes: number;
  breakTimeInMinutes: number;
  isBreakTime: boolean;
  startsAt?: Date;
  endsAt?: Date;
}

export class Pomodoro {
  private props: PomodoroProps;

  constructor(
    props: Replace<PomodoroProps, { finished?: boolean; isBreakTime?: boolean }>
  ) {
    this.props = {
      ...props,
      isBreakTime: props.isBreakTime ?? false,
    };
  }
  public start() {
    this.props.startsAt = new Date();
    return this.bookEndsAt();
  }

  private bookEndsAt() {
    if (!this.startsAt) {
      throw new PomodoroException('the starts at is not defined');
    }
    const endsAt = new Date(this.startsAt);
    const minutesToSet = this.isBreakTime
      ? this.breakTimeInMinutes
      : this.timeToFocusInMinutes;
    endsAt.setMinutes(endsAt.getMinutes() + minutesToSet);
    this.props.endsAt = endsAt;
    return endsAt;
  }

  public endFocus() {
    if (!this.isExpired()) {
      throw new PomodoroException('Pomodoro focus is not finished');
    }
    this.props.isBreakTime = true;
  }

  public isExpired() {
    if (!this.wasStarted()) {
      throw new PomodoroException('Pomodoro was not started');
    }
    return (this.endsAt as Date) <= new Date() ? true : false;
  }

  public wasStarted() {
    return !!this.startsAt && !!this.endsAt;
  }

  public get timeToFocusInMinutes() {
    return this.props.timeToFocusInMinutes;
  }
  public get breakTimeInMinutes() {
    return this.props.breakTimeInMinutes;
  }
  public get isBreakTime() {
    return this.props.isBreakTime;
  }
  public get startsAt() {
    return this.props.startsAt;
  }
  public get endsAt() {
    return this.props.endsAt;
  }
}
