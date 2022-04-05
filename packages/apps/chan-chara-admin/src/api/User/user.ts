import api from 'utils/api';

import type { IUserAPICall } from './types';

const userApiCall: IUserAPICall = {
  getSession: () =>
    api({
      method: 'get',
      url: '/auth/info',
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
      withCredentials: true,
    }),
  logout: () => {
    return api({
      method: 'get',
      url: '/auth/logout',
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
      withCredentials: true,
    });
  },
  getAdmin: (page, perPage) => {
    return api({
      method: 'get',
      url: `/auth/admin?page=${page}&perPage=${perPage}`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    });
  },
  delete: (adminId) => {
    return api({
      method: 'delete',
      url: `/auth/remove/${adminId}`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    });
  },
  createAdmin: (payload) => {
    return api({
      method: 'post',
      url: '/auth/admin/new',
      data: payload,
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    });
  },
};

export default userApiCall;
