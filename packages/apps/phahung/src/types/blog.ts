import { tag } from './tag';

export type BlogPreview = {
  id: string;
  title: string;
  content: string[];
  author: string;
  likes: number;
  createdAt: number;
  image: string;
  tag: tag;
};
