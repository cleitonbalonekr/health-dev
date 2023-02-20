import { ExternalTokenError } from './errors/external-token-error';

export class ExternalToken {
  private readonly externalToken: string;

  constructor(externalToken: string) {
    const isExternalTokenValid = this.validateExternalToken(externalToken);
    if (!isExternalTokenValid) {
      throw new ExternalTokenError('Invalid token lenght');
    }
    this.externalToken = externalToken;
  }

  private validateExternalToken(externalToken: string) {
    return externalToken.length >= 5;
  }

  get value(): string {
    return this.externalToken;
  }
}
