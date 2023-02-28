import React from 'react';
import Lottie from 'react-lottie';
import notificationDeniedAnimation from '../animations/notification-denied.json';
import {
  LOTTIE_BASE_OPTIONS,
  LOTTIE_HEIGHT,
  LOTTIE_WIDTH,
} from '../../../resources/base-settings';

const PermissionDenied: React.FC = () => {
  return (
    <div className="flex flex-1 p-1  flex-col items-center justify-center">
      <h4 className="text-center text-rose-500 font-bold text-xl">
        Permissão para notificações negada!
      </h4>
      <h5 className="text-center mt-1 my-2 text-rose-500 font-medium text-md">
        Verifique se seu navegador tem permissão para receber notificações e
        recarregue essa página.
      </h5>
      <Lottie
        options={{
          ...LOTTIE_BASE_OPTIONS,
          animationData: notificationDeniedAnimation,
        }}
        height={LOTTIE_HEIGHT - 100}
        width={LOTTIE_WIDTH}
      />
    </div>
  );
};

export default PermissionDenied;
