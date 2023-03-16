import { CalculeWaterQuantityDay } from '@/application/use-cases/water-reminder';
import { GetWaterQuantityDay } from '@/application/use-cases/water-reminder/get-water-quantity-day';
import BaseButton from '@/presentation/components/base-button';
import ConditionalView from '@/presentation/components/ConditionalView';
import Container from '@/presentation/components/container';
import NavigationHeader from '@/presentation/components/navigation-header';
import React, { useEffect, useState } from 'react';

interface Props {
  calculeWaterQuantityDay: CalculeWaterQuantityDay;
  getWaterQuantityDay: GetWaterQuantityDay;
}

const WaterReminder: React.FC<Props> = ({
  calculeWaterQuantityDay,
  getWaterQuantityDay,
}) => {
  const [weight, setWeight] = useState('');
  const [waterGoal, setWaterGoal] = useState<number>();

  useEffect(() => {
    loadWaterQuantity();
  }, []);

  const calculateWater = async () => {
    if (!weight) return;
    const response = await calculeWaterQuantityDay({
      weight: Number(weight),
    });
    setWaterGoal(response);
  };
  const loadWaterQuantity = async () => {
    const response = await getWaterQuantityDay();
    if (response) setWaterGoal(response);
  };

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
            value={weight}
            onChange={({ target }) => setWeight(target.value)}
          />
          <BaseButton
            type="button"
            className="flex flex-1 items-center justify-center ml-1"
            onClick={calculateWater}
          >
            Calcular
          </BaseButton>
        </form>
        <ConditionalView visible={!!waterGoal}>
          <h1 className="text-center font-bold text-emerald-500 my-4">
            Você precisa beber {waterGoal}l de água por dia.
          </h1>
          <BaseButton className="bg-emerald-500 hover:bg-e my-1">
            Lembrar de beber água
          </BaseButton>
          {/* <BaseButton>Remover lembrete</BaseButton> */}
        </ConditionalView>
      </main>
    </Container>
  );
};

export default WaterReminder;
