import { MathTokenGenerator } from '@/infra/gateways/math-token-generator';

describe('MathTokenGenerator', () => {
  let sut: MathTokenGenerator;
  beforeEach(() => {
    sut = new MathTokenGenerator();
  });

  it('should get the current mac address', async () => {
    const macAddress = await sut.generate();
    expect(macAddress).toBeTruthy();
    expect(macAddress.length).toBeGreaterThanOrEqual(10);
  });
});
