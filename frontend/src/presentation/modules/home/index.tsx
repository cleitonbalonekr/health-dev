import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate('/subscribe/12345');
  };

  return (
    <main
      className="bg-white flex flex-1 flex-col h-screen w-full items-center
    justify-center p-4
    "
    >
      <h1>Bem-vindo(a) ao Heath Dev</h1>
      <h2 className="text-center">
        Para conectar com a extensão digite o código
      </h2>
      <form>
        <input
          className="rounded-md bg-slate-200 text-black py-3 px-4 w-full mt-4 "
          type="text"
          placeholder="xxyyzz"
        />

        <button
          onClick={handleConfirm}
          type="button"
          className="rounded-md bg-green-700 hover:bg-green-800 py-3 w-full mt-4 text-white font-bold"
        >
          Confirmar
        </button>
      </form>
    </main>
  );
};

export default Home;
