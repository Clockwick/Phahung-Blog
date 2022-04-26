/* eslint-disable import/order */
import { Tag } from './tag';
import { DataProp } from 'editorjs-blocks-react-renderer';

export type BlogPreview = {
  id: string;
  title: string;
  author: string;
  likes: number;
  createAt: number;
  image: string;
  tags: Tag;
  status: string;
};

export type Blog = {
  id: string;
  title: string;
  content: DataProp;
  author: string;
  likes: number;
  createAt: number;
  image: string;
  tags: Tag;
};
