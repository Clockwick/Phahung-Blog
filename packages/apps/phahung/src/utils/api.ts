import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export default <T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    responseType: 'json',
  });
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        const localAdminJson = localStorage.getItem('phahung-user') ?? '';
        if (localAdminJson.length > 0) {
          const { isLoggedIn } = JSON.parse(JSON.parse(localAdminJson).user);
          if (isLoggedIn) {
            localStorage.removeItem('phahung-user');
            localStorage.removeItem('idToken');
            window.location.reload();
          }
        }
      }
      return error;
    },
  );

  return api.request<T>(config);
};
