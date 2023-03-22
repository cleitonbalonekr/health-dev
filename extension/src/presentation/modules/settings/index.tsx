import { useNavigate } from 'react-router-dom';
import Container from '@/presentation/components/container';
import NavigationHeader from '@/presentation/components/navigation-header';
import { FaChevronRight } from 'react-icons/fa';

const PAGES = [
  {
    title: 'Integrar Notificações',
    route: 'integration',
  },
  {
    title: 'Lembrete de Água',
    route: 'water-reminder',
  },
  {
    title: 'Notas',
    route: 'notes',
  },
  {
    title: 'Alarme',
    route: 'integration',
  },
];

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigationTo = (route: string) => {
    navigate(route);
  };
  return (
    <Container>
      <NavigationHeader />
      <main className="flex flex-1 flex-col px-2 items-center justify-center">
        {PAGES.map((page, index) => (
          <div
            key={index}
            onClick={() => handleNavigationTo(page.route)}
            className="flex  items-center justify-between w-full bg-rose-300 p-2 my-2 rounded"
          >
            <p className="text-black font-medium">{page.title}</p>
            <FaChevronRight size={18} color="black" />
          </div>
        ))}
        <footer className="mt-4">
          <p className="text-sm font-semibold">v1.0-beta</p>
        </footer>
      </main>
    </Container>
  );
};

export default Settings;
