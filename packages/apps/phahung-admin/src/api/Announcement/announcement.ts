import api from 'utils/api';

import type { IAnnouncementAPICall } from './types';

const announcementApiCall: IAnnouncementAPICall = {
  createNewAnnouncement: (payload) => {
    return api({
      method: 'post',
      url: '/announcement/new',
      data: payload,
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    });
  },
  editAnnouncement: (payload, announcementId) => {
    return api({
      method: 'put',
      url: `/announcement/${announcementId}/update`,
      data: payload,
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    });
  },

  deleteAnnouncement: (announcementId) => {
    return api({
      url: `/announcement/${announcementId}`,
      method: 'delete',
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    });
  },

  getAnnouncements: (page: number, perPage: number, q = '') => {
    return api({
      method: 'get',
      url: `/announcement/all?page=${page}&perPage=${perPage}${
        q.length > 0 ? `&q=${q}` : ''
      }`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    });
  },
  getAnnouncementById: (announcementId) => {
    return api({
      method: 'get',
      url: `/announcement/${announcementId}`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    });
  },
};

export default announcementApiCall;
