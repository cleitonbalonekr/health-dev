import { WaterReminderRepository } from '@/application/repositories/water-reminder-repository';
import {
  setupCalculeWaterQuantityDay,
  CalculeWaterQuantityDay,
} from '@/application/use-cases/water-reminder';
import { mock, MockProxy, mockReset } from 'vitest-mock-extended';
describe('CalculeWaterQuantityDay', () => {
  let sut: CalculeWaterQuantityDay;
  let waterReminderRepository: MockProxy<WaterReminderRepository>;
  const params = {
    weight: 61,
  };
  beforeAll(() => {
    waterReminderRepository = mock();
  });
  beforeEach(() => {
    mockReset(waterReminderRepository);
    sut = setupCalculeWaterQuantityDay(waterReminderRepository);
  });

  it('should return the quantity of water necessary by weight in liters', async () => {
    const expectedValue = 2.135;
    const response = await sut(params);
    expect(response).toBe(expectedValue);
  });
  it('should call WaterReminderRepository.save with correct values', async () => {
    const response = await sut(params);
    expect(waterReminderRepository.save).toHaveBeenCalledOnce();
    expect(waterReminderRepository.save).toHaveBeenCalledWith(response);
  });
});
