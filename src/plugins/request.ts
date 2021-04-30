import { provide, inject } from 'vue';
import Service from './service';

interface ServiceModel {
  axios: any;
  req: Function;
}

export const service: ServiceModel = new Service({
  baseUrl: 'http://localhost:3030',
  timeout: 5000
});

const RequestSymbol = Symbol();
const _request = () => {
  return service;
};

export function provideRequest() {
  provide(RequestSymbol, _request);
}

export function useRequest(): ServiceModel {
  const request: Function | undefined = inject(RequestSymbol);
  if (!request) {
    throw new Error('RequestSymbol registration failed');
  }
  return request();
}
