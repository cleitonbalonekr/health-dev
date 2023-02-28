import React from 'react';
import Lottie from 'react-lottie';
import revealLoadingAnimation from '../animations/reveal-loading.json';
import {
  LOTTIE_BASE_OPTIONS,
  LOTTIE_HEIGHT,
  LOTTIE_WIDTH,
} from '../../../resources/base-settings';

const LoadingRegistration: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <h4 className="text-center text-black font-bold text-xl">
        Conectando Dispositivo...
      </h4>
      <h5 className="text-center mt-1 text-black font-medium text-md">
        Não feche essa página.
      </h5>
      <Lottie
        options={{
          ...LOTTIE_BASE_OPTIONS,
          animationData: revealLoadingAnimation,
        }}
        height={LOTTIE_HEIGHT}
        width={LOTTIE_WIDTH}
      />
    </div>
  );
};

export default LoadingRegistration;
