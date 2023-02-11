import { ChromeAlarm } from '@/application/gateways/chrome-alarm';
import { AlarmRepository } from '@/application/repositories/alarm-repository';
import {
  setupBookPomodoroAlarm,
  BookPomodoroAlarm,
} from '@/application/use-cases/alarm';
import { mock, MockProxy } from 'vitest-mock-extended';
import { makeAlarm } from '../../factories/alarm-factory';
describe('BookPomodoroAlarm', () => {
  const actualDate = new Date();
  let sut: BookPomodoroAlarm;
  let chromeAlarm: MockProxy<ChromeAlarm>;
  let alarmRepository: MockProxy<AlarmRepository>;
  let params = {
    title: 'fake_title',
    description: 'fake_description',
    booksAt: actualDate,
  };
  beforeAll(() => {
    chromeAlarm = mock();
    alarmRepository = mock();
  });
  beforeEach(() => {
    sut = setupBookPomodoroAlarm(chromeAlarm, alarmRepository);
  });

  it('should create a alarm and call alarmAdpter', async () => {
    await sut(params);
    expect(chromeAlarm.bookAlarm).toBeCalledTimes(1);
  });
  it('should create a alarmRepository.save with correct values', async () => {
    const alarm = await sut(params);
    expect(alarmRepository.save).toBeCalledTimes(1);
    expect(alarmRepository.save).toBeCalledWith(alarm);
  });
});
