import { setupLoadPreferences } from "@/application/use-cases/preferences";
import { makeChromeStoragePreferencesRepository } from "../../infra/repositories/chrome-storage";

export const makeLoadPreferences = () => {
  return setupLoadPreferences(
    makeChromeStoragePreferencesRepository()
  );
};
