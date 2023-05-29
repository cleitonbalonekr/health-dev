import Container from '@/presentation/components/container';
import React from 'react';

const Notes: React.FC = () => {
  return (
    <Container>
      <main className="flex flex-1 items-center justify-center">
        <h1>Em Breve</h1>
      </main>
      <footer className="mt-4 flex items-center justify-center">
        <p className="text-sm font-semibold">v2.0-beta</p>
      </footer>
    </Container>
  );
};

export default Notes;
