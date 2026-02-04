'use server';

import { UserPublicDto, UserPublicDtoSchema } from '@/dto/User.dto';
import { CreateUserSchema } from '@/lib/validations/user.validation';
import { userRepository } from '@/repository/user';
import formateZodMessage from '@/utils/formate-zod-message.util';
import { redirect } from 'next/navigation';
import bcryptjs from 'bcryptjs';

type CreateUserAction = {
  errors: string[];
  formState: UserPublicDtoSchema;
};

export default async function createUserAction(
  state: CreateUserAction,
  formData: FormData,
): Promise<CreateUserAction> {
  if (!(formData instanceof FormData)) {
    return {
      errors: ['dados invalido'],
      formState: state.formState,
    };
  }
  const formObj = Object.fromEntries(formData.entries());

  const validUser = CreateUserSchema.safeParse(formObj);

  if (!validUser.success) {
    return {
      formState: UserPublicDto.parse(formObj),
      errors: formateZodMessage(validUser.error),
    };
  }

  //consertar isso
  validUser.data.password = await bcryptjs.hash(validUser.data.password, 8);

  try {
    await userRepository.create(validUser.data);
  } catch (e) {
    console.error(e);
    return {
      errors: ['deu merda'],
      formState: UserPublicDto.parse(formObj),
    };
  }

  redirect('/user/signin');
}
