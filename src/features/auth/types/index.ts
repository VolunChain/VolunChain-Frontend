export interface Auth {
  token: string;
  user: any; // Replace 'any' with a proper user type
}

export type AuthCredentials = {
  email: string;
  password?: string;
};
