'use server';

import { UserPublicDto } from '@/dto/User.dto';
import { UserAction } from '@/interfaces/user/useAction.interface';
import { CreateUserSchema } from '@/lib/validations/user.validation';
import { userRepository } from '@/repository/user';
import formateZodMessage from '@/utils/formate-zod-message.util';

import bcryptjs from 'bcryptjs';

export default async function registerAction(state: UserAction, formData: FormData): Promise<UserAction> {
  if (!(formData instanceof FormData)) {
    return {
      errors: ['dados invalido'],
      formState: state.formState,
      success: false,
    };
  }

  const formObj = Object.fromEntries(formData.entries());

  const validUser = CreateUserSchema.safeParse(formObj);

  if (!validUser.success) {
    return {
      formState: UserPublicDto.parse(formObj),
      errors: formateZodMessage(validUser.error),
      success: false,
    };
  }

  //consertar isso(acho criando serviço pra ficar dinamico)
  validUser.data.password = await bcryptjs.hash(validUser.data.password, 8);

  try {
    await userRepository.create(validUser.data);
    return {
      formState: UserPublicDto.parse(validUser.data),
      errors: [],
      success: true,
      actionType: 'CREATE_USER',
    };
  } catch (e) {
    if (e instanceof Error) {
      return {
        errors: [e.message],
        formState: UserPublicDto.parse(formObj),
        success: false,
      };
    }

    return {
      errors: ['deu merda'],
      formState: UserPublicDto.parse(formObj),
      success: false,
    };
  }
}
