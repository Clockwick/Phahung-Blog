import { BlogPreview } from '../types/blog';
export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  imageURL: string;
  role: number;
  isBan: boolean;
  likedBlogs: BlogPreview[];
}

export interface UserState {
  user?: User;
  isLoggedIn: boolean;
}
