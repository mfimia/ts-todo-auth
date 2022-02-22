export type UserCredentials = {
  email: string;
  password: string;
};

export interface AppCredentials {
  login: UserCredentials;
  register: UserCredentials;
}

export type UserForm = "login" | "register";
