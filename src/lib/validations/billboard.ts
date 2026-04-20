import { z } from 'zod';

export const BillboardFormSchema = z.object({
  label: z.string().trim().min(6, 'The label must have at least 6 characters.'),
  image_url: z
    .string()
    .trim()
    .refine((value) => !!new URL(value), 'The image url is required'),
});

export type BillboardFormDataType = z.infer<typeof BillboardFormSchema>;
