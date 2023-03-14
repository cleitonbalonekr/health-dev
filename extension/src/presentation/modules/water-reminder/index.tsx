import BaseButton from '@/presentation/components/base-button';
import Container from '@/presentation/components/container';
import NavigationHeader from '@/presentation/components/navigation-header';
import React from 'react';

const WaterReminder: React.FC = () => {
  return (
    <Container>
      <NavigationHeader />
      <main className="p-2 flex flex-1 flex-col">
        <p className="text-xs mb-1">
          Calcule a quantidade de água diária necessária
        </p>
        <form className="flex flex-row justify-between items-center">
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
        <h1 className="text-center font-bold text-emerald-500 my-4">
          Você precisa beber 2l de água por dia.
        </h1>
        <BaseButton className="bg-emerald-500 hover:bg-e mb-1">
          Lembrar de beber água
        </BaseButton>
        {/* <BaseButton>Remover lembrete</BaseButton> */}
      </main>
    </Container>
  );
};

export default WaterReminder;
