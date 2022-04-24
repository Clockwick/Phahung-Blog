import { AxiosResponse } from 'axios';
import { User } from 'store/types';
import { Blog, BlogPreview } from '../../types/blog';

type someResponse = { message: string; status: number };

export interface IUserApiCall {
  getLikedBlogs: () => Promise<AxiosResponse>;
  uploadImage: (imageFile: FormData | undefined) => Promise<AxiosResponse>;
  getSession: () => Promise<AxiosResponse>;
  updateUser: (userData: User) => Promise<AxiosResponse>;
}

// export interface IUserApiCall {
//   getLikedBlogs: () => Promise<AxiosResponse<BlogPreview[] | someResponse>>;
//   uploadImage: (
//     imageFile: FormData | undefined,
//   ) => Promise<AxiosResponse<{ url: string } | someResponse>>;
//   getSession: () => Promise<AxiosResponse | someResponse>;
//   updateUser: (userData: User) => Promise<AxiosResponse<User | someResponse>>;
// }
