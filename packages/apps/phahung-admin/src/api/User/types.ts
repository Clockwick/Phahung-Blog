import { AxiosResponse } from 'axios';
import { EmailPayload } from 'pages/Users/UserModal/types';

export interface IUserAPICall {
  getSession: () => Promise<AxiosResponse>;
  logout: () => Promise<AxiosResponse>;
  getAdmin: (page: number, perPage: number) => Promise<AxiosResponse>;
  delete: (adminId: string) => Promise<AxiosResponse>;
  createAdmin: (payload: EmailPayload) => Promise<AxiosResponse>;
}
