/* eslint-disable import/no-unresolved */
import { AxiosResponse } from 'axios';
import { IEditBlogPayload } from 'pages/Blogs/EditBlog/types';
import { IBlog, Tag } from 'pages/Blogs/types';
import { INewBlogPayload } from '../../pages/Blogs/NewBlog/types';

export interface IBlogAPICall {
  createNewBlog: (payload: INewBlogPayload) => Promise<AxiosResponse>;
  editBlog: (
    payload: IEditBlogPayload,
    blogId: string,
  ) => Promise<AxiosResponse>;
  deleteBlog: (blogId: string) => Promise<AxiosResponse>;
  uploadByFile: (file: File) => Promise<AxiosResponse>;
  uploadByURL: (url: URL) => Promise<AxiosResponse>;
  getAllTags: () => Promise<AxiosResponse<Tag[]>>;
  getBlogs: (
    page: number,
    perPage: number,
    search: string,
  ) => Promise<AxiosResponse>;
  getBlogById: (blogId: string) => Promise<AxiosResponse<IBlog>>;
  updateBlogStatus: (blogId: string, status: string) => Promise<AxiosResponse>;
}
