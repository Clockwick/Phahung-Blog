import { BlogPreview } from '../types/blog';
export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  imageURL: string;
  role: number;
  isBan: boolean;
  likedBlogs: string[];
}

export interface UserState {
  user?: User;
  isLoggedIn: boolean;
}
