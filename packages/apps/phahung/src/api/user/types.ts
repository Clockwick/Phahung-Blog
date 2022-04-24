import { AxiosResponse } from 'axios';
import { Blog, BlogPreview } from '../../types/blog';

export interface IUserApiCall {
  getLikedBlogs: () => Promise<AxiosResponse<BlogPreview[]>>;
  uploadImage: (
    imageFile: FormData | undefined,
  ) => Promise<AxiosResponse<{ url: string }>>;
  getSession: () => Promise<AxiosResponse>;
}
