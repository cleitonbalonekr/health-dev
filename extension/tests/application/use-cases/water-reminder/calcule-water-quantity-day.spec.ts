import {
  setupCalculeWaterQuantityDay,
  CalculeWaterQuantityDay,
} from '@/application/use-cases/water-reminder';
describe('CalculeWaterQuantityDay', () => {
  let sut: CalculeWaterQuantityDay;
  const params = {
    weight: 61,
  };
  beforeAll(() => {});
  beforeEach(() => {
    sut = setupCalculeWaterQuantityDay();
  });

  it('should return the quantity of water necessary by weight in liters', async () => {
    const response = await sut(params);
    expect(response).toBe(2.135);
  });
});
