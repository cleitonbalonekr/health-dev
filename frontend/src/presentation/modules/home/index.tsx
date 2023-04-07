import {
  LOTTIE_BASE_OPTIONS,
  LOTTIE_HEIGHT,
  LOTTIE_WIDTH,
} from '@/presentation/resources/base-settings';
import React, { useState } from 'react';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';
import welcomeAnimation from './animations/welcome-animation.json';

const Home: React.FC = () => {
  const [extensionId, setExtensionId] = useState('');
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (!extensionId) return;
    navigate(`subscribe/${extensionId}`);
  };

  return (
    <main
      className="bg-slate-100 flex flex-1 min-h-screen flex-col w-full items-center
    justify-center p-4 overflow-y-scroll
    "
    >
      <h1 className="font-bold text-center mb-2 text-zinc-900">
        Bem-vindo(a) ao Heath Dev
      </h1>
      <h2 className="text-justify font-medium text-zinc-900">
        Essa aplicação é destinada a conectar seu dispositivo móvel com a
        extensão para receber notificações.
      </h2>

      <Lottie
        options={{
          ...LOTTIE_BASE_OPTIONS,
          animationData: welcomeAnimation,
        }}
        height={LOTTIE_HEIGHT - 100}
        width={LOTTIE_WIDTH}
      />
      <h3 className="text-center font-medium text-zinc-900">
        Abra a extensão e leia o QCCode ou digite seu token de integração
        abaixo:
      </h3>
      <form>
        <input
          value={extensionId}
          onChange={({ target }) => setExtensionId(target.value)}
          className="rounded-md bg-slate-200 text-black py-3 px-4 w-full mt-4 "
          type="text"
          placeholder="xxyyzz"
        />
        <button
          onClick={handleConfirm}
          type="button"
          className="rounded-md bg-emerald-500 hover:bg-emerald-600 py-3 w-full mt-4 text-white font-bold"
        >
          Confirmar
        </button>
      </form>
    </main>
  );
};

export default Home;
