import { Preferences } from "@/application/entities/preferences";

export interface PreferencesRepository {
  save(preferences: Preferences): Promise<void>;
  load(): Promise<Preferences|null>;
}
