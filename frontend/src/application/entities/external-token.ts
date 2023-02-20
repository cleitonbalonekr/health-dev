export class ExternalToken {
  private readonly externalToken: string;

  constructor(externalToken: string) {
    this.externalToken = externalToken;
  }

  get value(): string {
    return this.externalToken;
  }
}
