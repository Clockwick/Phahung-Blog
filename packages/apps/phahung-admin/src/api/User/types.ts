/* eslint-disable import/no-unresolved */
import { AxiosResponse } from 'axios';
import { User } from 'pages/Users/ListUser/types';
import { EmailPayload } from 'pages/Users/UserModal/types';

export interface IUserAPICall {
  getSession: () => Promise<AxiosResponse>;
  logout: () => Promise<AxiosResponse>;
  getUser: (
    page: number,
    perPage: number,
    isBan: string,
  ) => Promise<AxiosResponse>;
  banUser: (adminId: string) => Promise<AxiosResponse>;
  unBanUser: (adminId: string) => Promise<AxiosResponse>;
  updateUser: (payload: User) => Promise<AxiosResponse<User>>;
  delete: (adminId: string) => Promise<AxiosResponse>;
  createAdmin: (payload: EmailPayload) => Promise<AxiosResponse>;
}
