import { Preferences } from '@/application/entities/preferences';
import { PreferencesRepository } from '@/application/repositories/preferences-repository';
import {
  setupLoadPreferences,
  LoadPreferences,
} from '@/application/use-cases/preferences';
import { mock, MockProxy, mockReset } from 'vitest-mock-extended';

describe('LoadPreferences', () => {
  let sut: LoadPreferences;
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
    sut = setupLoadPreferences(preferencesRepository);
  });

  it('should call PreferencesRepository.load with correct values', async () => {
    await sut();
    expect(preferencesRepository.load).toHaveBeenCalledOnce();
    expect(preferencesRepository.load).toHaveBeenCalledWith();
  });
  
  it('should return the user preferences', async () => {
    preferencesRepository.load.mockResolvedValueOnce(new Preferences(params));
    const response = await sut();
    expect(response).toEqual((new Preferences(params)).value);
  });
});
