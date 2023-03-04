import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { registerToken } from 'firebase-common-settings/src/messaging';
import { SaveSubscription } from '@/application/use-cases/save-subscription';
import RegistrationSucceed from './components/success';
import LoadingRegistration from './components/loading';
import RegistrationInternalError from './components/error';
import PermissionDenied from './components/permission-denied';
import { VerifyExternalToken } from '@/application/use-cases/verify-external-token';
import SearchNotFound from './components/not-found';

type Props = {
  saveSubscription: SaveSubscription;
  verifyExternalToken: VerifyExternalToken;
};

/* <a href="https://iconscout.com/lotties/reveal-loading" target="_blank">Reveal Loading Animated Icon</a> by <a href="https://iconscout.com/contributors/rgb4media">RGB4Media</a> on <a href="https://iconscout.com">IconScout</a> */

enum RegistrationError {
  PERMISSION_DENIED,
  SUBSCRIPTION,
  INVALID_TOKEN,
  NO_ERROR,
}

const Registration: React.FC<Props> = ({
  saveSubscription,
  verifyExternalToken,
}) => {
  const { extensionId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<RegistrationError>(
    RegistrationError.NO_ERROR
  );
  useEffect(() => {
    subscribeToNotifications();
  }, []);

  const subscribeToNotifications = async () => {
    try {
      setLoading(true);
      const isValidToken = await verifyExternalToken({
        externalToken: String(extensionId),
      });
      if (!isValidToken) {
        setError(RegistrationError.INVALID_TOKEN);
        return;
      }
      const permission = await askNotificationPermission();
      if (isPermissionDenied(permission)) {
        setError(RegistrationError.PERMISSION_DENIED);
        return;
      }
      const notificationToken = await registerToken();
      console.log('notificationToken', notificationToken);

      const response = await saveSubscription({
        notificationToken,
        externalToken: String(extensionId),
      });
      console.log('response', response);
    } catch (error) {
      console.log('error', error);
      setError(RegistrationError.SUBSCRIPTION);
    } finally {
      setLoading(false);
    }
  };
  const askNotificationPermission = async () => {
    const response = await Notification.requestPermission();
    return response;
  };
  const isPermissionDenied = (permission: NotificationPermission) => {
    if (permission === 'denied') {
      return true;
    }
    return false;
  };

  const FeedbackComponent = () => {
    switch (error) {
      case RegistrationError.PERMISSION_DENIED:
        return React.createElement(PermissionDenied);
      case RegistrationError.INVALID_TOKEN:
        return React.createElement(SearchNotFound);
      case RegistrationError.SUBSCRIPTION:
        return React.createElement(RegistrationInternalError);
      default:
        return React.createElement(RegistrationSucceed);
    }
  };

  return (
    <div className="min-h-screen flex flex-1 flex-col justify-center items-center h-screen bg-slate-50">
      {loading ? <LoadingRegistration /> : <FeedbackComponent />}
    </div>
  );
};

export default Registration;
