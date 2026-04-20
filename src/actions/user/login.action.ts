'use server';

import { UserPublicDto } from '@/dto/User.dto';
import { UserActionInterface } from '@/interfaces/user/useAction';
import { createLoginSession, createTokenJwt } from '@/lib/login/manage-user';
import { LoginUserSchema } from '@/lib/validations/user';
import { userRepository } from '@/repository/user';
import { formatZodMessage } from '@/utils/formats-functions';
import bcrypt from 'bcryptjs';

export default async function loginAction(
  state: UserActionInterface,
  formData: FormData,
): Promise<UserActionInterface> {
  if (!(formData instanceof FormData)) {
    return {
      errors: ['dados invalido'],
      formState: state.formState,
      success: false,
    };
  }
  const formObj = Object.fromEntries(formData.entries());
  const validUser = LoginUserSchema.safeParse(formObj);

  if (!validUser.success) {
    return {
      formState: UserPublicDto.parse(formObj),
      errors: formatZodMessage(validUser.error),
      success: false,
    };
  }

  try {
    const user = await userRepository.findOneEmail(validUser.data.email);
    const validPassword = await bcrypt.compare(validUser.data.password, user.password);

    if (!validPassword) throw new Error('Email ou Password invalid');

    const token = await createTokenJwt(user.id);

    await createLoginSession(token, 'user');

    return {
      formState: UserPublicDto.parse(validUser.data),
      errors: [],
      success: true,
      actionType: 'LOGIN_USER',
    };
  } catch (e: unknown) {
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
