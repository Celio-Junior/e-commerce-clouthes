import { UserCreateAttributes, UserModelInterface } from './UserModel';

export type UserRepositoryInterface = {
  create(userCreate: UserCreateAttributes): Promise<UserModelInterface>;
  findAll(): Promise<UserModelInterface[]>;
  findOne(user: UserCreateAttributes): Promise<UserModelInterface>;
};
