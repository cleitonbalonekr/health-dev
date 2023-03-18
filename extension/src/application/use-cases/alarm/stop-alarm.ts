import { AlarmType } from '@/application/entities/alarm';
import { AlarmService } from '@/application/gateways/alarm-service';
import { AlarmRepository } from '@/application/repositories/alarm-repository';

type Output = void;
type Input = {
  alarmType: AlarmType;
};
export type StopAlarm = (input: Input) => Promise<Output>;

type Setup = (
  alarmService: AlarmService,
  alarmRepository: AlarmRepository
) => StopAlarm;

export const setupStopAlarm: Setup =
  (alarmService, alarmRepository) =>
  async ({ alarmType }) => {
    await alarmRepository.remove(alarmType);
    alarmService.stopAlarm(alarmType);
  };
