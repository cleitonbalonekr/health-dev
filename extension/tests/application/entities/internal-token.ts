import { InternalToken } from '@/application/entities/internal-token';

describe('InternalToken', () => {
  it('should create a InternalToken', () => {
    const internalToken = new InternalToken('abcd');
    expect(internalToken).toBeInstanceOf(InternalToken);
    expect(internalToken).toMatchObject({
      internalToken: internalToken.value,
    });
  });
});
