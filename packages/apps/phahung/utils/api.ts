import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export default <T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return axios
    .create({
      baseURL: `${import.meta.env.VITE_API_URL}`,
      responseType: 'json',
      headers: { 'Content-Type': 'application/json' },
    })
    .request<T>(config);
};
