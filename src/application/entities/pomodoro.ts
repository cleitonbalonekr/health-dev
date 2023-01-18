import { Replace } from '@/helpers/Replace';

export interface PomodoroProps {
  timeToFocusInMinutes: number;
  breakTimeInMinutes: number;
  isBreakTime: boolean;
  finished: boolean;
  startsAt?: Date;
}

export class Pomodoro {
  private props: PomodoroProps;

  constructor(
    props: Replace<PomodoroProps, { finished?: boolean; isBreakTime?: boolean }>
  ) {
    this.props = {
      ...props,
      finished: props.finished ?? false,
      isBreakTime: props.isBreakTime ?? false,
    };
  }
  public start() {
    this.props.startsAt = new Date();
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
  public get finished() {
    return this.props.finished;
  }
  public get startsAt() {
    return this.props.startsAt;
  }
}
