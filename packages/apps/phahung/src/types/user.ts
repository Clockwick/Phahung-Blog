import { BlogPreview } from './blog';

export type IUser = {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  isBan: boolean;
  role: number;
  imageURL: string | null;
  likedBlogs: BlogPreview[];
};
