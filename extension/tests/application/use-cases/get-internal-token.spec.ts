import { TokenGenerator } from '@/application/gateways/token-generator';
import {
  setupGetInternalToken,
  GetInternalToken,
} from '@/application/use-cases/get-internal-token';
import { mock, MockProxy, mockReset } from 'vitest-mock-extended';
describe('GetInternalToken', () => {
  let sut: GetInternalToken;
  let tokenGenerator: MockProxy<TokenGenerator>;
  beforeAll(() => {
    tokenGenerator = mock();
  });
  beforeEach(() => {
    mockReset(tokenGenerator);
    tokenGenerator.generate.mockResolvedValue('valid_token');
    sut = setupGetInternalToken(tokenGenerator);
  });

  it('should call TokenGenerator.generate', async () => {
    await sut();
    expect(tokenGenerator.generate).toBeCalledTimes(1);
    expect(tokenGenerator.generate).toBeCalledWith();
  });

  it('should return a token', async () => {
    const response = await sut();
    expect(response).toEqual({
      internalToken: 'valid_token',
    });
  });
});
