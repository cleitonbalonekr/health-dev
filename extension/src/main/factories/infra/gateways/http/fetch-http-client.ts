import { FetchHttpClient } from '@/infra/gateways/http/fetch-http-client';

export const makeFetchHttpClient = () => {
  return new FetchHttpClient();
};
