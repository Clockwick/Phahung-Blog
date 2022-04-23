import type EditorJS from '@editorjs/editorjs';

export interface IBlog {
  _id: string;
  content: EditorJS.OutputData;
  tags: Array<string>;
  status: string;
  imagePath: string;
  keyword: string;
}

export interface ITags {
  tags: Array<Tag>;
}

export interface ITagResponse {
  success: number;
  tags: Array<Tag>;
}

export type Tag = {
  id: string;
  name: string;
  status: boolean;
};

export type NonStatusTag = {
  name: string;
};

export type Author = {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
};
