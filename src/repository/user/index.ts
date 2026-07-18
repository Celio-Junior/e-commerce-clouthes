import { initDB } from '@/database';
import { UserCreateAttributes, UserModelInterface } from '@/interfaces/user/UserModel';
import { UserRepositoryInterface } from '@/interfaces/user/UserRepository';
import User from '@/models/User';
//talvez criar serviços(regra de negócios) e hash pra senha
class UserRepository implements UserRepositoryInterface {
  constructor() {
    initDB();
  }
  async findOne(user: Partial<UserCreateAttributes>): Promise<UserModelInterface> {
    const isUser = await User.findOne({ where: user });

    if (!isUser) throw new Error('User não existe');

    return isUser;
  }
  async create(userCreate: UserCreateAttributes): Promise<UserModelInterface> {
    const isUser = await User.findOne({ where: { email: userCreate.email } });

    if (isUser) throw new Error('Usuário ja existe tentar outro email');

    return await User.create(userCreate);
  }
  findAll(): Promise<UserModelInterface[]> {
    throw new Error('Method not implemented.');
  }
  async findOneEmail(email: string): Promise<UserModelInterface> {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('User não existe');
    return user;
  }
}

export const userRepository = new UserRepository();
