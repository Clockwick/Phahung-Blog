import type EditorJS from '@editorjs/editorjs';

export interface INewBlogPayload {
  keyword: string;
  titleImage: string;
  content: EditorJS.OutputData;
  tags: Array<string>;
  status: string;
  imagePath: string;
  author: string;
}
