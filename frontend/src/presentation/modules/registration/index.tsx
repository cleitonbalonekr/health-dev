import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { registerToken } from 'firebase';

const Registration: React.FC = () => {
  const { extensionId } = useParams();
  const [token, setToken] = useState('');

  useEffect(() => {
    registerToken(setToken);
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center h-screen">
      {!token ? (
        <h3>Carregando...</h3>
      ) : (
        <p className="text-justify">Tudo pronto</p>
      )}
    </div>
  );
};

export default Registration;
