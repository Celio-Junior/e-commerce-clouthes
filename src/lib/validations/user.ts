import { z } from 'zod';

const CreateUserBase = z.object({
  name: z.string().trim().min(6, 'Name precisa no mínimo 6 caracteres'),
  email: z.email('precisa ser email válido'),
  phone: z.string().default(''),
  password: z.string().trim().min(6, 'Senha precisa no mínimo 6 caracteres'),
  repPassword: z.string().trim().min(6, 'Repetir senha tem que ter no mínimo 6 caracteres'),
});

export const CreateUserSchema = CreateUserBase.superRefine((value, ctx) => {
  if (value.password !== value.repPassword) {
    ctx.addIssue({
      code: 'custom',
      message: 'Senhas são diferentes',
    });
  }
}).transform(({ name, phone, email, password }) => ({ name, phone, email, password }));

export const LoginUserSchema = CreateUserBase.omit({
  name: true,
  repPassword: true,
  phone: true,
});

export const UpdateUserSchema = CreateUserBase.omit({
  repPassword: true,
  password: true,
}).extend({});
