import Settings from '@/presentation/modules/settings';
import { makeGetInternalToken } from '@/main/factories/use-cases/get-internal-token-factory';

export const makeSettings = () => {
  return <Settings getInternalToken={makeGetInternalToken()} />;
};
