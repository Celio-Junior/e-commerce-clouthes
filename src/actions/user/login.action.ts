'use server';
import { UserPublicDto, UserPublicDtoSchema } from '@/dto/User.dto';
import { LoginUserSchema } from '@/lib/validations/user.validation';
import { userRepository } from '@/repository/user';
import formateZodMessage from '@/utils/formate-zod-message.util';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

type LoginUserAction = {
  errors: string[];
  formState: UserPublicDtoSchema;
  success: boolean;
};

export default async function LoginAction(
  state: LoginUserAction,
  formData: FormData,
): Promise<LoginUserAction> {
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
      errors: formateZodMessage(validUser.error),
      success: false,
    };
  }

  try {
    const user = await userRepository.findOneEmail(validUser.data.email);
    const validPassword = await bcrypt.compare(validUser.data.password, user.password);

    if (!validPassword) throw new Error('Password invalid');

    return {
      formState: UserPublicDto.parse(validUser.data),
      errors: [],
      success: true,
    };
  } catch (e) {
    console.error(e);
    return {
      errors: ['deu merda'],
      formState: UserPublicDto.parse(formObj),
      success: false,
    };
  }

  // redirect('/');
}
