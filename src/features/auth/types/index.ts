export interface User {
  id: string;
  email: string;
  name?: string;
  // Add other user properties as needed
}

export interface Auth {
  token: string;
  user: User;
}

export type AuthCredentials = {
  email: string;
  password?: string;
};
