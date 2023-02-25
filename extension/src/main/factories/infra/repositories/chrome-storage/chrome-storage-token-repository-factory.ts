import { ChromeStorageTokenRepository } from '@/infra/database/chrome-storage/repositories/chrome-storage-token-repository';

export const makeChromeStorageTokenRepository = () => {
  return new ChromeStorageTokenRepository();
};
