export interface PreferencesProps{
  pomodoro?:{
    timeToFocus: number;
    timeToRest:number
  }
}
export class Preferences {
  private readonly preferences: PreferencesProps;

  constructor(preferences: PreferencesProps) {
    this.preferences = preferences;
  }

  get value(): PreferencesProps {
    return this.preferences;
  }
}
