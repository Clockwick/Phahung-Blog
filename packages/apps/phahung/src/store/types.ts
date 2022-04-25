import { BlogPreview } from '../types/blog';
import { comment } from '../types/comment';
export interface User {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  imageURL?: string;
  role: number;
  isBan: boolean;
  likedBlogs: BlogPreview[];
  likedComments?: comment[];
}

export interface UserState {
  user?: User;
  isLoggedIn: boolean;
}
