import { ExternalToken } from './external-token';

export interface SubscriptionProps {
  notificationToken: string;
  externalToken: ExternalToken;
}

export class Subscription {
  private props: SubscriptionProps;

  constructor(props: SubscriptionProps) {
    this.props = props;
  }

  public get notificationToken(): string {
    return this.props.notificationToken;
  }
  public get externalToken(): ExternalToken {
    return this.props.externalToken;
  }
}
