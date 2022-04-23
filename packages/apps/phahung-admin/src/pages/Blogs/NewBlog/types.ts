import type EditorJS from '@editorjs/editorjs';
import { NonStatusTag } from '../types';

export interface INewBlogPayload {
  title: string;
  image: string;
  content: EditorJS.OutputData;
  tags: Array<NonStatusTag>;
  status: string;
  // imagePath: string;
  author: string;
}
