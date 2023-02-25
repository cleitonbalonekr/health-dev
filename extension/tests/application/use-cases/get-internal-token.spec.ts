import { TokenGenerator } from '@/application/gateways/token-generator';
import {
  setupGetInternalToken,
  GetInternalToken,
} from '@/application/use-cases/get-internal-token';
import { mock, MockProxy, mockReset } from 'vitest-mock-extended';
describe('GetInternalToken', () => {
  let sut: GetInternalToken;
  let tokenGenerator: MockProxy<TokenGenerator>;
  let params: any;
  beforeAll(() => {
    tokenGenerator = mock();
  });
  beforeEach(() => {
    mockReset(tokenGenerator);
    sut = setupGetInternalToken(tokenGenerator);
  });

  it('should call  TokenGenerator.generate', async () => {
    await sut(params);
    expect(tokenGenerator.generate).toBeCalledTimes(1);
    expect(tokenGenerator.generate).toBeCalledWith();
  });
});
