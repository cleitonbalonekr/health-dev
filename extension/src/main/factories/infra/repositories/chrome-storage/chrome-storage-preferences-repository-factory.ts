import { ChromeStoragePreferencesRepository } from "@/infra/database/chrome-storage/repositories/chrome-storage-preferences-repository";

export const makeChromeStoragePreferencesRepository = () => {
  return new ChromeStoragePreferencesRepository();
};
