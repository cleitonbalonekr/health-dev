export class InternalToken {
  private readonly internalToken: string;

  constructor(internalToken: string) {
    this.internalToken = internalToken;
  }

  get value(): string {
    return this.internalToken;
  }
}
