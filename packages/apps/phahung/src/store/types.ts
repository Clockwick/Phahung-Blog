export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
  role: string;
  isBan: boolean;
}

export interface UserState {
  user?: User;
  isLoggedIn: boolean;
}
