export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
}

export interface UserState {
  user?: User;
  isLoggedIn: boolean;
}
