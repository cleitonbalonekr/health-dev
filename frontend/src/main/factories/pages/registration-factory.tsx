import Registration from '@/presentation/modules/registration';
import { makeSaveSubscription } from '../use-cases';

export const makeRegistration = () => (
  <Registration saveSubscription={makeSaveSubscription()} />
);
