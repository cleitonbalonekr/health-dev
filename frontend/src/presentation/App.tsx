import { useEffect, useState } from 'react';
import { registerToken, foregroundMessage } from 'firebase';

function App() {
  const [token, setToken] = useState('');
  useEffect(() => {
    registerToken(setToken);
    foregroundMessage();
  }, []);

  return <h1 className="text-rose-800">Hello - {token}</h1>;
}

export default App;
