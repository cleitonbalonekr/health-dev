import { ChromeAlarm } from '@/application/gateways/chrome-alarm';
import {
  setupBookPomodoroAlarm,
  BookPomodoroAlarm,
} from '@/application/use-cases/alarm';
import { mock, MockProxy } from 'vitest-mock-extended';
describe('BookPomodoroAlarm', () => {
  const actualDate = new Date();
  let sut: BookPomodoroAlarm;
  let chromeAlarm: MockProxy<ChromeAlarm>;
  let params = {
    title: 'fake_title',
    description: 'fake_description',
    booksAt: actualDate,
  };
  beforeAll(() => {
    chromeAlarm = mock();
  });
  beforeEach(() => {
    sut = setupBookPomodoroAlarm(chromeAlarm);
  });

  it('should create a alarm and call alarmAdpter', () => {
    sut(params);
    expect(chromeAlarm.bookAlarm).toBeCalledTimes(1);
  });
});
