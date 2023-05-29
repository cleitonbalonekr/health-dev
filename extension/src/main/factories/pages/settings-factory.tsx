import Settings from '@/presentation/modules/settings';
import { makeGetInternalToken } from '@/main/factories/use-cases/integration';

export const makeSettings = () => {
  return <Settings getInternalToken={makeGetInternalToken()}/>;
};
