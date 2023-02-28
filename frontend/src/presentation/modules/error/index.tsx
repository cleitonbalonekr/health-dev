import {
  LOTTIE_BASE_OPTIONS,
  LOTTIE_HEIGHT,
  LOTTIE_WIDTH,
} from '@/presentation/resources/base-settings';
import React from 'react';
import Lottie from 'react-lottie';
import pageNotFoundAnimation from './animations/error-404.json';

const ErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen p-2 flex flex-1 flex-col items-center justify-center bg-slate-100">
      <h4 className="text-center text-black font-bold text-xl">
        Ops! Parece que não tem nada por aqui.
      </h4>

      <Lottie
        options={{
          ...LOTTIE_BASE_OPTIONS,
          animationData: pageNotFoundAnimation,
        }}
        height={LOTTIE_HEIGHT}
        width={LOTTIE_WIDTH}
      />
    </div>
  );
};

export default ErrorPage;
