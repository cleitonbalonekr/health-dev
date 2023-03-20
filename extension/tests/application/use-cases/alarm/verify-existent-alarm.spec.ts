import { AlarmType } from '@/application/entities/alarm';
import { AlarmRepository } from '@/application/repositories/alarm-repository';
import {
  setupVerifyExistentAlarm,
  VerifyExistentAlarm,
} from '@/application/use-cases/alarm';
import { mock, MockProxy, mockReset } from 'vitest-mock-extended';
import { makeAlarm } from '@/tests/application/factories/alarm-factory';

describe('VerifyExistentAlarm', () => {
  let sut: VerifyExistentAlarm;
  let alarmRepository: MockProxy<AlarmRepository>;
  let params = {
    alarmType: AlarmType.POMODORO,
  };

  beforeAll(() => {
    alarmRepository = mock();
  });
  beforeEach(() => {
    mockReset(alarmRepository);
    alarmRepository.getByType.mockResolvedValue(makeAlarm());
    sut = setupVerifyExistentAlarm(alarmRepository);
  });

  it('should call AlarmRepository.getByType with correct values', async () => {
    await sut(params);
    expect(alarmRepository.getByType).toBeCalledTimes(1);
    expect(alarmRepository.getByType).toHaveBeenCalledWith(params.alarmType);
  });
  it('should return false when an alarm does not exist', async () => {
    alarmRepository.getByType.mockResolvedValueOnce(null);
    const response = await sut(params);
    expect(response).toBeFalsy();
  });
  it('should return true when exist an alarm', async () => {
    const response = await sut(params);
    expect(response).toBeTruthy();
  });
});
