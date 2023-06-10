import Settings from '@/presentation/modules/settings';
import { makeGetInternalToken } from '@/main/factories/use-cases/integration';
import { makeLoadPreferences, makeSavePreferences } from '@/main/factories/use-cases/preferences';

export const makeSettings = () => {
  return <Settings 
  getInternalToken={makeGetInternalToken()}
  savePreferences={makeSavePreferences()}
  loadPreferences={makeLoadPreferences()}
  />;
};
