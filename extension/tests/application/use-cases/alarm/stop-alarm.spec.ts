import { AlarmType } from '@/application/entities/alarm';
import { AlarmService } from '@/application/gateways/alarm-service';
import { AlarmRepository } from '@/application/repositories/alarm-repository';
import { setupStopAlarm, StopAlarm } from '@/application/use-cases/alarm';
import { mock, MockProxy, mockReset } from 'vitest-mock-extended';

describe('StopAlarm', () => {
  let sut: StopAlarm;
  let alarmService: MockProxy<AlarmService>;
  let alarmRepository: MockProxy<AlarmRepository>;
  let params = {
    alarmType: AlarmType.POMODORO,
  };

  beforeAll(() => {
    alarmService = mock();
    alarmRepository = mock();
  });
  beforeEach(() => {
    mockReset(alarmRepository);
    mockReset(alarmService);
    sut = setupStopAlarm(alarmService, alarmRepository);
  });

  it('should call AlarmRepository.remove with correct values', async () => {
    await sut(params);
    expect(alarmRepository.remove).toBeCalledTimes(1);
    expect(alarmRepository.remove).toHaveBeenCalledWith(params.alarmType);
  });
  it('should call AlarmService.stopAlarm with correct values', async () => {
    await sut(params);
    expect(alarmService.stopAlarm).toBeCalledTimes(1);
    expect(alarmService.stopAlarm).toHaveBeenCalledWith(params.alarmType);
  });
});
