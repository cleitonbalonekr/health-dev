import Registration from '@/presentation/modules/registration';
import { makeSaveSubscription, makeVerifyExternalToken } from '../use-cases';

export const makeRegistration = () => (
  <Registration
    saveSubscription={makeSaveSubscription()}
    verifyExternalToken={makeVerifyExternalToken()}
  />
);
