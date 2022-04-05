import api from '../utils/api';

import type { IFeedApiCall } from './types';

const feedApiCall: IFeedApiCall = {
  getTags: () =>
    api({
      method: 'get',
      url: '/blog/tag/all',
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    }),
  getBlogs: (page, offset, keyword) =>
    api({
      method: 'get',
      url: `/blog?page=${page}&perPage=${offset}&q=${keyword}`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    }),
  getBlog: (id) =>
    api({
      method: 'get',
      url: `/blog/${id}`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    }),
  getBlogsByTag: (page, offset, keyword, tagId) =>
    api({
      method: 'get',
      url: `/blog/bytag?page=${page}&perPage=${offset}&q=${keyword}&tagId=${tagId}`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    }),
};

export default feedApiCall;
