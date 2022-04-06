import api from 'utils/api';

import type { ITagAPICall } from './types';

const tagApiCall: ITagAPICall = {
  createNewTag: (tag) => {
    return api({
      method: 'post',
      url: '/blog/tag/new',
      data: { tag },
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    });
  },
  deleteTag: (id) => {
    return api({
      url: `/blog/tag/${id}`,
      method: 'delete',
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    });
  },
};

export default tagApiCall;
