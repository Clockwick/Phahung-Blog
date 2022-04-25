import api from '../utils/api';

import type { IFeedApiCall } from './types';

const feedApiCall: IFeedApiCall = {
  getBlogs: () =>
    api({
      method: 'get',
      url: `/blogs?`,
    }),
  getBlogById: (id) =>
    api({
      method: 'get',
      url: `/blogs/${id}`,
    }),
  getBlogsByTag: (tagName, q) =>
    api({
      method: 'get',
      url: `/blogs?tagName=${tagName}&search=${q}`,
    }),
  likeBlog: (id) =>
    api({
      method: 'put',
      url: `/${id}/like`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    }),
  unlikeBlog: (id) =>
    api({
      method: 'put',
      url: `/${id}/dislike`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    }),
};

export default feedApiCall;
