import React from 'react';
import Lottie from 'react-lottie';
import revealErrorOccurredAnimation from '../animations/error-occurred.json';
import {
  LOTTIE_BASE_OPTIONS,
  LOTTIE_HEIGHT,
  LOTTIE_WIDTH,
} from '../../../resources/base-settings';

const RegistrationInternalError: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <h4 className="text-center text-rose-500 font-bold text-xl">
        Ops! Não foi possível conectar dispositivo
      </h4>
      <h5 className="text-center my-1 text-rose-500 font-medium text-md">
        Tente novamente mais tarde.
      </h5>
      <Lottie
        options={{
          ...LOTTIE_BASE_OPTIONS,
          animationData: revealErrorOccurredAnimation,
        }}
        height={LOTTIE_HEIGHT - 50}
        width={LOTTIE_WIDTH + 50}
      />
    </div>
  );
};

export default RegistrationInternalError;
