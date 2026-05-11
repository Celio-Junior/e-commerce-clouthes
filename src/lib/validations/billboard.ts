import { z } from 'zod';

export const BillboardCreateFormSchema = z.object({
  image_id: z.string().trim().nonempty('image id is required'),
  label: z.string().trim().min(6, 'The label must have at least 6 characters.'),
  image_url: z
    .string()
    .trim()
    .refine((value) => !!new URL(value), 'The image url is required'),
});

export const BillboardUpdateFormSchema = BillboardCreateFormSchema.extend({
  id: z.string().trim().nonempty('id is required'),
});

export type BillboardCreateFormType = z.infer<typeof BillboardCreateFormSchema>;
export type BillboardUpdateFormType = z.infer<typeof BillboardUpdateFormSchema>;
