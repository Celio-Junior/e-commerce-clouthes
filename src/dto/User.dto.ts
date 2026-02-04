import { z } from 'zod';

export const UserPublicDto = z.object({
  name: z.string().default(''),
  email: z.string().default(''),
  phone: z.string().default(''),
});

export type UserPublicDtoSchema = z.infer<typeof UserPublicDto>;
