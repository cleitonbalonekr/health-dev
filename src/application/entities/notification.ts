export type NotificationProps = {
  title: string;
  description: string;
  iconUrl: string;
};

export class Notification {
  private props: NotificationProps;
  constructor(props: NotificationProps) {
    this.props = props;
  }

  public get title(): string {
    return this.props.title;
  }
  public get description(): string {
    return this.props.description;
  }
  public get iconUrl(): string {
    return this.props.iconUrl;
  }
}
