import { Replace } from '@/helpers/Replace';
import { PomodoroException } from './errors/pomodoro-exception';

export enum POMODORO_MODE {
  FOCUS = 1,
  BREAK_TIME = 2,
}

export interface PomodoroProps {
  timeToFocusInMinutes: number;
  breakTimeInMinutes: number;
  mode: POMODORO_MODE;
  startsAt?: Date | null;
  endsAt?: Date | null;
}

export class Pomodoro {
  private props: PomodoroProps;

  constructor(
    props: Replace<PomodoroProps, { finished?: boolean; mode?: POMODORO_MODE }>
  ) {
    this.props = {
      ...props,
      mode: props.mode ?? POMODORO_MODE.FOCUS,
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
    const minutesToSet = this.getModeMinutes();
    endsAt.setMinutes(endsAt.getMinutes() + minutesToSet);
    this.props.endsAt = endsAt;
    return endsAt;
  }

  private getModeMinutes() {
    return this.mode === POMODORO_MODE.BREAK_TIME
      ? this.breakTimeInMinutes
      : this.timeToFocusInMinutes;
  }

  public finishCicle() {
    if (!this.isExpired()) {
      throw new PomodoroException('Pomodoro is not finished');
    }
    this.props.mode = this.toggleMode();
    this.props.startsAt = null;
    this.props.endsAt = null;
  }

  private toggleMode() {
    return this.mode === POMODORO_MODE.BREAK_TIME
      ? POMODORO_MODE.FOCUS
      : POMODORO_MODE.BREAK_TIME;
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
  public get mode() {
    return this.props.mode;
  }
  public get startsAt() {
    return this.props.startsAt;
  }
  public get endsAt() {
    return this.props.endsAt;
  }
}
