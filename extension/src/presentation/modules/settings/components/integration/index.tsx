import { QRCodeCanvas } from 'qrcode.react';
import { GetInternalToken } from '@/application/use-cases/integration/get-internal-token';
import { useEffect, useState } from 'react';
import ConditionalView from '@/presentation/components/ConditionalView';

const REGISTRATION_URL = 'https://cleitonbalonekr.github.io/health-dev/#/';

interface Props {
  getInternalToken: GetInternalToken;
}

const Integration: React.FC<Props> = ({ getInternalToken }) => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    try {
      setLoading(true);
      const { internalToken } = await getInternalToken();
      setToken(internalToken);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ConditionalView visible={!!token}>
        <main className="flex flex-col items-center justify-center ">
          <p className="text-center text-sm text-white mb-3">
          Leia o QRCode abaixo para integrar seu dispositivo
          </p>
          <div className="flex items-center justify-center bg-slate-50 rounded-lg p-4">
            <QRCodeCanvas value={`${REGISTRATION_URL}subscribe/${token}`} />
          </div>
        </main>
      </ConditionalView>
      <ConditionalView visible={!token}>
        <span className='text-center text-white'>
          {loading
            ? 'Carregando Token para integração'
            : 'Falha ao obter token para integração'}
        </span>
      </ConditionalView>
      </>
  );
};

export default Integration;
