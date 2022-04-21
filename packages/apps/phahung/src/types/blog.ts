import { tag } from './tag';

export type BlogPreview = {
  id: string;
  title: string;
  author: string;
  likes: number;
  createdAt: number;
  image: string;
  tag: tag;
};

