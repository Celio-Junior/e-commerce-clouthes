import { z } from 'zod';

export const CategoryCreateFormSchema = z.object({
  name: z.string().trim().min(6, 'The name category must have at least 6 characters.'),
  billboard_id: z.string().trim().nonempty('billboard id is required'),
});

export type CategoryCreateFormType = z.infer<typeof CategoryCreateFormSchema>;
