import React from 'react';
import Lottie from 'react-lottie';
import devicesSyncAnimation from '../animations/devices-sync.json';
import {
  LOTTIE_BASE_OPTIONS,
  LOTTIE_HEIGHT,
  LOTTIE_WIDTH,
} from '../../../resources/base-settings';

const RegistrationSucceed: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col bg-emerald-500 items-center justify-center">
      <h4 className="text-center text-white font-bold text-xl">
        Dispositivo conectado!
      </h4>
      <h5 className="text-center mt-1 text-white font-medium text-md">
        Você já pode fechar essa página.
      </h5>

      <Lottie
        options={{
          ...LOTTIE_BASE_OPTIONS,
          animationData: devicesSyncAnimation,
        }}
        height={LOTTIE_HEIGHT}
        width={LOTTIE_WIDTH}
      />
    </div>
  );
};

export default RegistrationSucceed;
