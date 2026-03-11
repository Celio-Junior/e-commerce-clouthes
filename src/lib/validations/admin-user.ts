import z from 'zod';

export const AdminUserLoginSchema = z.object({
  email: z.email('precisa ser email válido'),
  password: z.string().min(6, 'precisa ter no mínimo 6 caracteres'),
});
