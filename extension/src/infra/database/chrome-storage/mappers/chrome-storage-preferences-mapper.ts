import { Preferences } from "@/application/entities/preferences";

export class ChromeStoragePreferencesMapper {
  static toChromeStorage(preferences: Preferences) {
    return JSON.stringify(preferences.value);
  }
  static toPreferences(raw: any) {
    const jsonRaw = JSON.parse(raw);
    return new Preferences({...jsonRaw});
  }
}
