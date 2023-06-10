import { Preferences } from '@/application/entities/preferences';
import { PreferencesRepository } from '@/application/repositories/preferences-repository';
import {
  setupSavePreferences,
  SavePreferences,
} from '@/application/use-cases/preferences';
import { mock, MockProxy, mockReset } from 'vitest-mock-extended';

describe('SavePreferences', () => {
  let sut: SavePreferences;
  let preferencesRepository: MockProxy<PreferencesRepository>;
  const params = {
    pomodoro:{
      timeToFocus: 25,
      timeToRest:5
    }
  };
  beforeAll(() => {
    preferencesRepository = mock();
  });
  beforeEach(() => {
    mockReset(preferencesRepository);
    sut = setupSavePreferences(preferencesRepository);
  });

  it('should call PreferencesRepository.save with correct values', async () => {
    await sut(params);
    expect(preferencesRepository.save).toHaveBeenCalledOnce();
    expect(preferencesRepository.save).toHaveBeenCalledWith(
      new Preferences(params)
    );
  });
});
