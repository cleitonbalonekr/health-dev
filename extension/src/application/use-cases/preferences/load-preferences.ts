import { Preferences } from "@/application/entities/preferences";
import { PreferencesRepository } from "@/application/repositories/preferences-repository";

type Output = Preferences

export type LoadPreferences = () => Promise<Output>;

type Setup = (
  preferencesRepository: PreferencesRepository
) => LoadPreferences;

export const setupCalculeLoadPreferences: Setup =
  (preferencesRepository) =>
  async () => {
    const response = await preferencesRepository.load();
    return response
  };
