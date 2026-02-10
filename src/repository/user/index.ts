import { UserCreateAttributes, UserModel } from '@/interfaces/UserModel.interface';
import { UserRepositoryInterface } from '@/interfaces/UserRepository.interface';
import User from '@/models/User.model';
//talvez criar serviços(regra de negócios) e hash pra senha
class UserRepository implements UserRepositoryInterface {
  async findOne(user: Partial<UserCreateAttributes>): Promise<UserModel> {
    const isUser = await User.findOne({ where: user });

    if (!isUser) throw new Error('User não existe');

    return isUser;
  }
  async create(userCreate: UserCreateAttributes): Promise<UserModel> {
    const isUser = await User.findOne({ where: { email: userCreate.email } });

    if (isUser) throw new Error('Usuário ja existe tentar outro email');

    return await User.create(userCreate);
  }
  findAll(): Promise<UserModel[]> {
    throw new Error('Method not implemented.');
  }
  async findOneEmail(email: string): Promise<UserModel> {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('User não existe');
    return user;
  }
}

export const userRepository = new UserRepository();
