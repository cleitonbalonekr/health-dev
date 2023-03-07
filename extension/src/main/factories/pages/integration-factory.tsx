import Integration from '@/presentation/modules/integration';
import { makeGetInternalToken } from '@/main/factories/use-cases/get-internal-token-factory';

export const makeIntegration = () => {
  return <Integration getInternalToken={makeGetInternalToken()} />;
};
