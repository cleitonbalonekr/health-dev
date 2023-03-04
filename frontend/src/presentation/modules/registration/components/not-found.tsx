import React from 'react';
import Lottie from 'react-lottie';
import searchNotFoundAnimation from '../animations/search-not-found.json';
import {
  LOTTIE_BASE_OPTIONS,
  LOTTIE_HEIGHT,
  LOTTIE_WIDTH,
} from '../../../resources/base-settings';

const SearchNotFound: React.FC = () => {
  return (
    <div className="flex flex-1 p-1  flex-col items-center justify-center">
      <h4 className="text-center text-rose-500 font-bold text-xl">
        Token de integração não encontrado!
      </h4>
      <h5 className="text-center mt-1 my-2 text-rose-500 font-medium text-md">
        Verifique se o token de está correto e tente novamente.
      </h5>
      <Lottie
        options={{
          ...LOTTIE_BASE_OPTIONS,
          animationData: searchNotFoundAnimation,
        }}
        height={LOTTIE_HEIGHT - 100}
        width={LOTTIE_WIDTH + 100}
      />
    </div>
  );
};

export default SearchNotFound;
