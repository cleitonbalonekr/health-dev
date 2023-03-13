import BaseButton from '@/presentation/components/base-button';
import Container from '@/presentation/components/container';
import NavigationHeader from '@/presentation/components/navigation-header';
import React from 'react';

const WaterReminder: React.FC = () => {
  return (
    <Container>
      <NavigationHeader />
      <main className="p-2">
        <p className="text-xs mb-1">
          Calcule a quantidade de água diária necessária
        </p>
        <form
          action=""
          className="flex flex-1 flex-row justify-between items-center"
        >
          <input
            className="rounded-md bg-slate-200 text-black py-3 px-4 w-2/5"
            type="number"
            name="wight"
            placeholder="Peso"
          />
          <BaseButton
            type="button"
            className="flex flex-1 items-center justify-center ml-1"
          >
            Calcular
          </BaseButton>
        </form>
      </main>
    </Container>
  );
};

export default WaterReminder;
