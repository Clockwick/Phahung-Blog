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
      url: `/blogs?tagName=${tagName}?search=${q}`,
    }),
};

export default feedApiCall;
