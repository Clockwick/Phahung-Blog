import { Tag } from './tag';

export type BlogPreview = {
  id: string;
  title: string;
  author: string;
  likes: number;
  createdAt: number;
  image: string;
  tag: Tag;
};

export type Blog = {
  id: string;
  title: string;
  content: string[];
  author: string;
  likes: number;
  createdAt: number;
  image: string;
  tag: Tag;
};

