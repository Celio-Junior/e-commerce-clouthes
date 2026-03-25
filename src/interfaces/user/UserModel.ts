export type UserModelInterface = {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
};

export type UserCreateAttributes = Omit<UserModelInterface, 'id'>;
