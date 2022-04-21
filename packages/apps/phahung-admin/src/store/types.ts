export interface User {
  id: string;
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
