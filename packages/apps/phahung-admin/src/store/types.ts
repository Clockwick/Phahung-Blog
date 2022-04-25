export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  image: string;
  role: number;
  email: string;
}

export interface UserState {
  user?: User;
  isLoggedIn: boolean;
}
