import { GetInternalToken } from '@/application/use-cases/integration';
import BaseButton from '@/presentation/components/base-button';
import Container from '@/presentation/components/container';
import Integration from './components/integration';
interface Props {
  getInternalToken: GetInternalToken;
}

const Settings: React.FC<Props> = ({getInternalToken}) => {
  return (
    <Container>
      <main className="flex flex-1 flex-col">
          hello
      </main>
      <Integration  getInternalToken={getInternalToken}/>
    </Container>
  );
};

export default Settings;
