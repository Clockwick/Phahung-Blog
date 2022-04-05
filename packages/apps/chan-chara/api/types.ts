import { AxiosResponse } from 'axios';

export interface IFeedApiCall {
  getTags: () => Promise<AxiosResponse>;
  getBlogs: (
    page: number,
    offset: number,
    keyword: string,
  ) => Promise<AxiosResponse>;
  getBlog: (id: string) => Promise<AxiosResponse>;
  getBlogsByTag: (
    page: number,
    offset: number,
    keyword: string,
    tagId: string,
  ) => Promise<AxiosResponse>;
}
