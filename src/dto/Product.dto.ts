import { z } from 'zod';

export const ProductPublicDto = z.object({
  id_image: z.string().default(''),
  image_url: z.url().default(''),
  name: z.string().default(''),
  price: z.coerce.number().default(0),
  category_id: z.string().default(''),
  size_id: z.string().default(''),
  color_id: z.string().default(''),
});
