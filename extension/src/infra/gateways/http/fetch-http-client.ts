import {
  HttpRequest,
  HttpResponse,
  HttpClient,
} from '@/application/gateways/http';

export class FetchHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let response: any;
    let body: any;
    try {
      response = await fetch(data.url, {
        method: data.method,
        body: JSON.stringify(data.body),
        headers: data.headers,
      });
      body = await response.json();
    } catch (error: any) {
      body = error.message;
    }
    return {
      statusCode: response ? response.status : 500,
      body: body,
    };
  }
}
