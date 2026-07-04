import { z } from 'zod';
export const ProductCreateFormSchema = z.object({
  id_image: z.string().nonempty('id is product required'),
  image_url: z.url('image url is required'),
  name: z.string().nonempty('name is required').min(3, 'Name is too short'),
  //FIXME mais parâmetros em price(acrescentar)
  price: z.number().min(1, 'The price must be non-zero.'),
  category_id: z.string().nonempty('category required'),
  size_id: z.string().nonempty('category required'),
  color_id: z.string().nonempty('color required'),
});

export const ProductUpdateFormSchema = ProductCreateFormSchema.extend({
  id: z.string().nonempty('id is product required'),
});

export type ProductCreateFormType = z.infer<typeof ProductCreateFormSchema>;
export type ProductUpdateFormType = z.infer<typeof ProductUpdateFormSchema>;
