import { AlarmType } from '@/application/entities/alarm';
import { AlarmService } from '@/application/gateways/alarm-service';
import { AlarmRepository } from '@/application/repositories/alarm-repository';
import {
  setupStartWaterAlarm,
  StartWaterAlarm,
} from '@/application/use-cases/alarm';
import { mock, MockProxy, mockReset } from 'vitest-mock-extended';
import { makeAlarm } from '../../factories/alarm-factory';

describe('StartWaterAlarm', () => {
  const actualDate = new Date();
  let sut: StartWaterAlarm;
  let alarmService: MockProxy<AlarmService>;
  let alarmRepository: MockProxy<AlarmRepository>;

  beforeAll(() => {
    alarmService = mock();
    alarmRepository = mock();
  });
  beforeEach(() => {
    mockReset(alarmRepository);
    mockReset(alarmService);
    sut = setupStartWaterAlarm(alarmService, alarmRepository);
  });

  it('should create a water alarm and call alarmService', async () => {
    await sut();
    expect(alarmService.bookAlarm).toBeCalledTimes(1);
    expect(alarmService.bookAlarm).toHaveBeenCalledWith({
      minutesRemaining: 2,
      id: AlarmType.WATER_REMINDER,
      repeatEveryMinutes: 90,
    });
  });
  it('should call AlarmRepository.save with correct values', async () => {
    const { alarm } = await sut();
    const expectCall = makeAlarm(alarm);
    expect(alarmRepository.save).toBeCalledTimes(1);
    expect(alarmRepository.save).toHaveBeenCalledWith(expectCall);
  });
});
