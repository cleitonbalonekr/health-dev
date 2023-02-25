import { TokenGenerator } from '@/application/gateways';

export class MathTokenGenerator implements TokenGenerator {
  async generate(): Promise<string> {
    return this.makeRandomString() + this.makeRandomString();
  }

  private makeRandomString() {
    return Math.random().toString(36).substr(2);
  }
}
