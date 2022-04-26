import { Author } from '../types';

export interface IBlogStatus {
  id: string;
  checked: boolean;
}
export interface IBlogsResponse {
  success: string;

  blogs: {
    docs: Array<Blog>;
    totalDocs: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    prevPage: number | null;
    nextPage: number | null;
  };
}

export type Blog = {
  id: string;
  title: string;
  description: string;
  createAt: number;
  image: string;
  author: Author;
  status: string;
};

export type BlogStatusResponse = {
  success: number;
  status: string;
};
