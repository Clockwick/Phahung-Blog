import type EditorJS from '@editorjs/editorjs';

export interface IBlog {
  _id: string;
  content: EditorJS.OutputData;
  tags: Array<Tag>;
  status: string;
  imagePath: string;
  keyword: string;
}

export interface ITags {
  success: number;
  tags: Array<Tag>;
}

export interface ITagResponse {
  success: number;
  tags: Array<Tag>;
}

export type Tag = {
  _id: string;
  tag?: string;
  status: boolean;
};

export type NonStatusTag = {
  _id: string;
  tag: string;
};

export type Author = {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
};
