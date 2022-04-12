export interface User {
  id: string;
  firstName: string;
  lastName: string;
  image: string;
  role: string;
  email: string;
}

export interface UserState {
  user?: User;
  isLoggedIn: boolean;
}
