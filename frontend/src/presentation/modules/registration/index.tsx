import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { registerToken } from 'firebase-common-settings/src/messaging';
import { SaveSubscription } from '@/application/use-cases/save-subscription';
import RegistrationSucceed from './components/success';
import LoadingRegistration from './components/loading';
import RegistrationInternalError from './components/error';
import PermissionDenied from './components/permission-denied';

type Props = {
  saveSubscription: SaveSubscription;
};

/* <a href="https://iconscout.com/lotties/reveal-loading" target="_blank">Reveal Loading Animated Icon</a> by <a href="https://iconscout.com/contributors/rgb4media">RGB4Media</a> on <a href="https://iconscout.com">IconScout</a> */

enum RegistrationError {
  PERMISSION_DENIED,
  SUBSCRIPTION,
  NO_ERROR,
}

const Registration: React.FC<Props> = ({ saveSubscription }) => {
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
      if (!extensionId) {
        return;
      }
      const permission = await askNotificationPermission();
      if (isPermissionDenied(permission)) {
        setError(RegistrationError.PERMISSION_DENIED);
        return;
      }
      const notificationToken = await registerToken();
      const response = await saveSubscription({
        notificationToken,
        externalToken: extensionId,
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

  return (
    <div className="min-h-screen flex flex-1 flex-col justify-center items-center h-screen bg-slate-50">
      {loading ? (
        <LoadingRegistration />
      ) : error === RegistrationError.NO_ERROR ? (
        <RegistrationSucceed />
      ) : error === RegistrationError.PERMISSION_DENIED ? (
        <RegistrationInternalError />
      ) : (
        <PermissionDenied />
      )}
    </div>
  );
};

export default Registration;
