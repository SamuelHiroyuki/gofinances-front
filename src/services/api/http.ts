import axios, { AxiosResponse } from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3333',
});

export type Response<T> = Promise<AxiosResponse<T>>;
export default http;
