type Props = {
  title: string;
  description: string;
  iconUrl: string;
};

export class Notification {
  private props: Props;
  constructor(props: Props) {
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

// class Alarm{
//   private booketAt:Date;
//   private repeatBetweenMinutes:number| null;
// }
