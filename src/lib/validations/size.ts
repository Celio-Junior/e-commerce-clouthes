import { z } from 'zod';

export const SizeCreateFormSchema = z.object({
  name: z.string().trim().min(1, 'The name category must have at least 6 characters.'),
  value: z.string().trim().nonempty('value is required'),
});

export const SizeUpdateFormSchema = SizeCreateFormSchema.extend({
  id: z.string().trim().nonempty('id is required'),
});

export type SizeCreateFormType = z.infer<typeof SizeCreateFormSchema>;
export type sizeUpdateFormType = z.infer<typeof SizeUpdateFormSchema>;
