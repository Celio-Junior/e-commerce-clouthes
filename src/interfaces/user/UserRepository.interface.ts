import { UserCreateAttributes, UserModel } from './UserModel.interface';

export type UserRepositoryInterface = {
  create(userCreate: UserCreateAttributes): Promise<UserModel>;
  findAll(): Promise<UserModel[]>;
  findOne(user: UserCreateAttributes): Promise<UserModel>;
};
