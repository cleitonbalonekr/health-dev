import Container from '@/presentation/components/container';
import NavigationHeader from '@/presentation/components/navigation-header';
import React from 'react';

const Alarm: React.FC = () => {
  return (
    <Container>
      <NavigationHeader />
      <main className="flex flex-1 items-center justify-center">
        <h1>Em Breve</h1>
      </main>
    </Container>
  );
};

export default Alarm;
