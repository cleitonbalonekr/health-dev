import { setupSavePreferences } from "@/application/use-cases/preferences";
import { makeChromeStoragePreferencesRepository } from "../../infra/repositories/chrome-storage";

export const makeSavePreferences = () => {
  return setupSavePreferences(
    makeChromeStoragePreferencesRepository()
  );
};
