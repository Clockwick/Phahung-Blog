export interface User {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  imageURL?: string;
  role: number;
  isBan: boolean;
  likedBlogs?: string[];
  likedComments: string[];
}

export interface UserState {
  user?: User;
  isLoggedIn: boolean;
}
