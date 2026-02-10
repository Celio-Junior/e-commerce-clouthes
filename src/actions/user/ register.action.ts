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
  success: boolean;
};

export default async function registerAction(
  state: CreateUserAction,
  formData: FormData,
): Promise<CreateUserAction> {
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
    };
  } catch (e) {
    console.error(e);
    return {
      errors: ['deu merda'],
      success: false,
      formState: UserPublicDto.parse(formObj),
    };
  }
}
