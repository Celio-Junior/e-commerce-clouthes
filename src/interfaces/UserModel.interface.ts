export type UserModel = {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
};

export type UserCreateAttributes = Omit<UserModel, 'id'>;
