import Integration from '@/presentation/modules/integration';
import { makeGetInternalToken } from '@/main/factories/use-cases/integration';

export const makeIntegration = () => {
  return <Integration getInternalToken={makeGetInternalToken()} />;
};
