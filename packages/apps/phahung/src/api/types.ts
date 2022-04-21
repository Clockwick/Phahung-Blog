import { AxiosResponse } from 'axios';

export interface IFeedApiCall {
  getBlogs: () => Promise<AxiosResponse>;
  getBlogById: (id: string) => Promise<AxiosResponse>;
  getBlogsByTag: (
    tagName: string,
  ) => Promise<AxiosResponse>;
}
