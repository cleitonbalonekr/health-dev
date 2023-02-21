import { AlarmService } from '@/application/gateways/alarm-service';
import { AlarmRepository } from '@/application/repositories/alarm-repository';
import {
  setupBookPomodoroAlarm,
  BookPomodoroAlarm,
} from '@/application/use-cases/alarm';
import { mock, MockProxy, mockReset } from 'vitest-mock-extended';
describe('BookPomodoroAlarm', () => {
  const actualDate = new Date();
  let sut: BookPomodoroAlarm;
  let alarmService: MockProxy<AlarmService>;
  let alarmRepository: MockProxy<AlarmRepository>;
  let params = {
    title: 'fake_title',
    description: 'fake_description',
    booksAt: actualDate,
  };
  beforeAll(() => {
    alarmService = mock();
    alarmRepository = mock();
  });
  beforeEach(() => {
    mockReset(alarmRepository);
    mockReset(alarmService);
    sut = setupBookPomodoroAlarm(alarmService, alarmRepository);
  });

  it('should create a alarm and call alarmAdpter', async () => {
    await sut(params);
    expect(alarmService.bookAlarm).toBeCalledTimes(1);
    expect(alarmService.bookAlarm).toBeCalledWith({
      minutesRemaining: 0,
      id: 'pomodoro',
      repeatEveryMinutes: undefined,
    });
  });
  it('should call alarmRepository.save with correct values', async () => {
    const alarm = await sut(params);
    expect(alarmRepository.save).toBeCalledTimes(1);
    expect(alarmRepository.save).toBeCalledWith(alarm);
  });
});
