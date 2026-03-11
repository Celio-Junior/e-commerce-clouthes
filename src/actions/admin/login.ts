'use server';

import { AdminUserLoginSchema } from '@/lib/validations/admin-user';
import formateZodMessage from '@/utils/formate-zod-message.util';
import env from 'env-var';
type AdminLoginActionType = {
  errors: string[];
  success: boolean;
};

export default async function loginAdmin(formData: FormData): Promise<AdminLoginActionType> {
  if (!(formData instanceof FormData)) {
    return {
      errors: ['dados invalido'],
      success: false,
    };
  }

  const formObj = Object.fromEntries(formData);

  const validUser = AdminUserLoginSchema.safeParse(formObj);

  if (!validUser.success) {
    return {
      errors: formateZodMessage(validUser.error),
      success: false,
    };
  }

  const isEmail = env.get('ADMIN_LOGIN_EMAIL').default('').asString() !== validUser.data.email;
  const isPassword = env.get('ADMIN_LOGIN_PASSWORD').default('').asString() !== validUser.data.password;

  if (isEmail || isPassword) {
    return {
      errors: ['email e senha inválida'],
      success: false,
    };
  }

  return {
    errors: [],
    success: true,
  };
}
