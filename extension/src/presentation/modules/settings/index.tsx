import { QRCodeCanvas } from 'qrcode.react';
import Container from '@/presentation/components/container';
import NavigationHeader from '@/presentation/components/navigation-header';

const REGISTRATION_URL = 'https://25cd-201-33-169-181.sa.ngrok.io/';

const Settings: React.FC = () => {
  return (
    <Container>
      <NavigationHeader />
      {/* <h1 className="text-center font-medium">Settings Page</h1> */}
      <main className="flex flex-1 flex-col items-center justify-center">
        <p className="text-center text-sm">
          Para receber notificações em seu celular, leia o QRCode abaixo e siga
          as instruções
        </p>
        <QRCodeCanvas value={`${REGISTRATION_URL}subscribe/testNotification`} />
        ,
      </main>
    </Container>
  );
};

export default Settings;
