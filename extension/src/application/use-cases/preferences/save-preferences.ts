import { Preferences } from "@/application/entities/preferences";
import { PreferencesRepository } from "@/application/repositories/preferences-repository";

type Output = void;
type Input = {
  pomodoro?:{
    timeToFocus: number
    timeToRest: number
  }
};

export type SavePreferences = (input: Input) => Promise<Output>;

type Setup = (
  preferencesRepository: PreferencesRepository
) => SavePreferences;

export const setupCalculeSavePreferences: Setup =
  (preferencesRepository) =>
  async (preferences) => {
    await preferencesRepository.save(new Preferences(preferences));
  };
