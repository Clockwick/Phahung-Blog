/* eslint-disable import/no-unresolved */
import api from 'utils/api';

import type { IUserAPICall } from './types';

const userApiCall: IUserAPICall = {
  getSession: () =>
    api({
      method: 'post',
      url: '/get-session',
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
      withCredentials: true,
    }),
  logout: () => {
    return api({
      method: 'post',
      url: '/logout',
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
      withCredentials: true,
    });
  },
  getUser: (page, perPage) => {
    return api({
      method: 'get',
      url: `/users?page=${page}&perPage=${perPage}`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    });
  },
  delete: (adminId) => {
    return api({
      method: 'delete',
      url: `/unsubscription/${adminId}`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    });
  },
  banUser: (adminId) => {
    return api({
      method: 'delete',
      url: `/users/${adminId}/ban`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    });
  },
  unBanUser: (adminId) => {
    return api({
      method: 'delete',
      url: `/users/${adminId}/unban`,
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
