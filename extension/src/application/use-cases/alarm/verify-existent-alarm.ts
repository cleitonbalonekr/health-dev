import { AlarmType } from '@/application/entities/alarm';
import { AlarmRepository } from '@/application/repositories/alarm-repository';

type Output = boolean;
type Input = {
  alarmType: AlarmType;
};
export type VerifyExistentAlarm = (input: Input) => Promise<Output>;

type Setup = (alarmRepository: AlarmRepository) => VerifyExistentAlarm;

export const setupVerifyExistentAlarm: Setup =
  (alarmRepository) =>
  async ({ alarmType }) => {
    const hasAlarm = await alarmRepository.getByType(alarmType);
    return !!hasAlarm;
  };
