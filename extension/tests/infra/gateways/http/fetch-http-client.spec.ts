import { HttpRequest, HttpResponse } from '@/application/gateways/http';
import { FetchHttpClient } from '@/infra/gateways/http/fetch-http-client';

global.fetch = vi.fn();
function createFetchResponse(data: any) {
  return { json: () => new Promise((resolve) => resolve(data)), status: 200 };
}
describe('FetchHttpClient', () => {
  let sut: FetchHttpClient;
  let request: HttpRequest;
  let response: HttpResponse;
  let mockedFetch = vi.mocked(fetch);
  beforeAll(() => {
    request = {
      url: 'fake_url',
      method: 'post',
      body: { test: 'any' },
      headers: {
        toke: 'any',
      },
    };
    response = {
      statusCode: 400,
      body: 'any',
    };
  });
  beforeEach(() => {
    vi.mocked(fetch).mockResolvedValue(createFetchResponse('any') as any);

    sut = new FetchHttpClient();
  });
  it('Should call fetch with correct values', async () => {
    await sut.request(request);

    expect(fetch).toHaveBeenCalledWith(request.url, {
      body: JSON.stringify(request.body),
      headers: request.headers,
      method: request.method,
    });
  });

  it('Should return correct response', async () => {
    const httpResponse = await sut.request(request);
    const fetchResponse = await vi.mocked(fetch).mock.results[0].value;
    const data = await fetchResponse.json();
    expect(httpResponse).toEqual({
      statusCode: fetchResponse.status,
      body: data,
    });
  });

  it('Should return correct error', async () => {
    vi.mocked(fetch).mockRejectedValueOnce({
      response,
    });

    const promise = await sut.request(request);
    expect(promise).toEqual({
      statusCode: 500,
    });
  });
});
