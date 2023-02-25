import { InternalToken } from '@/application/entities/internal-token';

export class ChromeStorageTokenMapper {
  static toChromeStorage(internalToken: InternalToken) {
    return internalToken.value;
  }
  static toInternalToken(raw: any) {
    return new InternalToken(raw);
  }
}
