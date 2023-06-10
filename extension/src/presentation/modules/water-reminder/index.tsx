import { AlarmType } from '@/application/entities/alarm';
import {
  StartWaterAlarm,
  StopAlarm,
  VerifyExistentAlarm,
} from '@/application/use-cases/alarm';
import { CalculeWaterQuantityDay } from '@/application/use-cases/water-reminder';
import { GetWaterQuantityDay } from '@/application/use-cases/water-reminder/get-water-quantity-day';
import BaseButton from '@/presentation/components/base-button';
import BaseInput from '@/presentation/components/base-input';
import ConditionalView from '@/presentation/components/ConditionalView';
import Container from '@/presentation/components/container';
import React, { useEffect, useState } from 'react';

interface Props {
  calculeWaterQuantityDay: CalculeWaterQuantityDay;
  getWaterQuantityDay: GetWaterQuantityDay;
  startWaterAlarm: StartWaterAlarm;
  stopAlarm: StopAlarm;
  verifyExistentAlarm: VerifyExistentAlarm;
}

const WaterReminder: React.FC<Props> = ({
  calculeWaterQuantityDay,
  getWaterQuantityDay,
  startWaterAlarm,
  stopAlarm,
  verifyExistentAlarm,
}) => {
  const [weight, setWeight] = useState('');
  const [waterGoal, setWaterGoal] = useState<number>();
  const [hasWaterAlarm, setHasWaterAlarm] = useState<boolean>();

  useEffect(() => {
    loadWaterQuantity();
    loadWaterAlarm();
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
  const loadWaterAlarm = async () => {
    try {
      const response = await verifyExistentAlarm({
        alarmType: AlarmType.WATER_REMINDER,
      });
      if (response) {
        setHasWaterAlarm(response);
      }
    } catch (error) {
      alert(error);
    }
  };

  const startAlarm = async () => {
    try {
      await startWaterAlarm();
      setHasWaterAlarm(true);
    } catch (error) {
      console.log(error);
    }
  };

  const stopWaterAlarm = async () => {
    try {
      await stopAlarm({
        alarmType: AlarmType.WATER_REMINDER,
      });
      setHasWaterAlarm(false);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container>
      <main className="p-2 flex flex-1 flex-col mt-8">
        <p className="text-sm mb-1 text-white">
          Calcule a quantidade de água diária necessária
        </p>
        <form className="flex flex-row items-center">
          <BaseInput
            className="flex flex-1 rounded-md bg-slate-200 text-black py-3 px-4 w-4/5"
            type="number"
            name="wight"
            placeholder="Peso"
            value={weight}
            onChange={({ target }) => setWeight(target.value)}
          />
          <BaseButton
            type="button"
            className="ml-1 py-3"
            onClick={calculateWater}
          >
            Calcular
          </BaseButton>
        </form>
        <ConditionalView visible={!!waterGoal}>
          <h1 className="text-center font-bold text-white my-4">
            Você precisa beber {waterGoal}l de água por dia.
          </h1>
          {!hasWaterAlarm ? (
            <BaseButton
              onClick={startAlarm}
              className="my-1"
            >
              Lembrar de beber água
            </BaseButton>
          ) : (
            <BaseButton className="my-1" onClick={stopWaterAlarm}>
              Remover lembrete
            </BaseButton>
          )}
        </ConditionalView>
      </main>
    </Container>
  );
};

export default WaterReminder;
