import type EditorJS from '@editorjs/editorjs';
import { IBlog } from '../types';

export interface IBlogResponse {
  success: number;
  blog: IBlog;
}

export interface IEditBlogPayload {
  title: string;
  image: string;
  content: EditorJS.OutputData;
  tags: Array<string>;
  status: string;
  _id: string;
  author: string;
  __v: number;
}
