import { QRCodeCanvas } from 'qrcode.react';
import Container from '@/presentation/components/container';
import NavigationHeader from '@/presentation/components/navigation-header';
import { GetInternalToken } from '@/application/use-cases/get-internal-token';
import { useEffect, useState } from 'react';
import ConditionalView from '@/presentation/components/ConditionalView';

const REGISTRATION_URL = 'https://0dbd-201-33-169-181.sa.ngrok.io/';

interface Props {
  getInternalToken: GetInternalToken;
}

const Settings: React.FC<Props> = ({ getInternalToken }) => {
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
    <Container>
      <NavigationHeader />
      {/* <h1 className="text-center font-medium">Settings Page</h1> */}
      <ConditionalView visible={!!token}>
        <main className="flex flex-1 flex-col items-center justify-center">
          <p className="text-center text-sm">
            Para receber notificações em seu celular, leia o QRCode abaixo e
            siga as instruções
          </p>
          <QRCodeCanvas value={`${REGISTRATION_URL}subscribe/${token}`} />,
        </main>
      </ConditionalView>
      <ConditionalView visible={!token}>
        {loading
          ? 'Carregando Token para integração'
          : 'Falha ao obter token para integração'}
      </ConditionalView>
    </Container>
  );
};

export default Settings;
