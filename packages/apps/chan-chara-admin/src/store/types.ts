export interface User {
  id: string;
  name: string;
  picture: string;
  role: string;
  email: string;
}

export interface UserState {
  user?: User;
  isLoggedIn: boolean;
}
