export interface User {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  imageURL: string | null;
  role: 1;
  isBan: boolean;
  likedBlogs: BlogPreview[];
  likedComments: comment[] | null;
}
export interface UserState {
  user?: User;
  isLoggedIn: boolean;
}

export type Tag = {
  id: string;
  name: string;
};

export type BlogPreview = {
  id: string;
  title: string;
  author: string;
  likes: number;
  createdAt: number;
  image: string;
  tag: Tag;
};

export type comment = {
  id: string;
  createdAt: string;
  author: string;
  content: string;
  likes: number;
  hide: boolean;
};
