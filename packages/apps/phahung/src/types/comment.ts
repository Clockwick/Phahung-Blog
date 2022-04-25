import { CommentOwner } from './user';

export type ParentComment = {
  id: string;
  createAt: number;
  owner: CommentOwner;
  likes: number;
  content: string;
  isParent: boolean;
  visible: boolean;
  comments: SubComment[];
};

export type SubComment = {
  id: string;
  createAt: number;
  owner: CommentOwner;
  likes: number;
  content: string;
  parentId: string;
  visible: boolean;
  parentOwner: CommentOwner;
};
