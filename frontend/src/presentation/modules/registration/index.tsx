import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { registerToken } from 'firebase-common-settings/src/messaging';
import { SaveSubscription } from '@/application/use-cases/save-subscription';

type Props = {
  saveSubscription: SaveSubscription;
};

const Registration: React.FC<Props> = ({ saveSubscription }) => {
  const { extensionId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    subscribeToNotifications();
  }, []);

  const subscribeToNotifications = async () => {
    try {
      setLoading(true);
      if (!extensionId) {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center h-screen">
      {loading ? (
        <h3>Carregando...</h3>
      ) : (
        <p className="text-justify">Tudo pronto</p>
      )}
    </div>
  );
};

export default Registration;
