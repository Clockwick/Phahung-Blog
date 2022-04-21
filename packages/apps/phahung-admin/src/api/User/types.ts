/* eslint-disable import/no-unresolved */
import { AxiosResponse } from 'axios';
import { EmailPayload } from 'pages/Users/UserModal/types';

export interface IUserAPICall {
  getSession: () => Promise<AxiosResponse>;
  logout: () => Promise<AxiosResponse>;
  getUser: (page: number, perPage: number) => Promise<AxiosResponse>;
  banUser: (adminId: string) => Promise<AxiosResponse>;
  unBanUser: (adminId: string) => Promise<AxiosResponse>;
  delete: (adminId: string) => Promise<AxiosResponse>;
  createAdmin: (payload: EmailPayload) => Promise<AxiosResponse>;
}
