import z from 'zod';

export const CategoryPublicDto = z.object({
  name: z.string().default(''),
  billboard_id: z.string().default(''),
});
