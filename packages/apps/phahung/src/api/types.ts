import { AxiosResponse } from 'axios';
import { Blog, BlogPreview } from 'types/blog';

export interface IFeedApiCall {
  getBlogs: () => Promise<AxiosResponse<BlogPreview[]>>;
  getBlogById: (id: string) => Promise<AxiosResponse<Blog>>;
  getBlogsByTag: (tagName: string) => Promise<AxiosResponse<BlogPreview[]>>;
}
