import {  PreferencesProps } from "@/application/entities/preferences";
import { PreferencesRepository } from "@/application/repositories/preferences-repository";

type Output = PreferencesProps|null

export type LoadPreferences = () => Promise<Output>;

type Setup = (
  preferencesRepository: PreferencesRepository
) => LoadPreferences;

export const setupLoadPreferences: Setup =
  (preferencesRepository) =>
  async () => {
    const response = await preferencesRepository.load();
    return response?.value ?? null;
  };
