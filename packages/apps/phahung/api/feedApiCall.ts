import api from '../utils/api';

import type { IFeedApiCall } from './types';

const feedApiCall: IFeedApiCall = {
  getTags: () =>
    api({
      method: 'get',
      url: '/blog/tag',
    }),
  getBlogs: (page, offset, keyword) =>
    api({
      method: 'get',
      url: `/blog?page=${page}&perPage=${offset}&q=${keyword}`,
    }),
  getBlog: (id) =>
    api({
      method: 'get',
      url: `/blog/${id}`,
    }),
  getBlogsByTag: (page, offset, keyword, tagId) =>
    api({
      method: 'get',
      url: `/blog/bytag?page=${page}&perPage=${offset}&q=${keyword}&tagId=${tagId}`,
    }),
};

export default feedApiCall;
