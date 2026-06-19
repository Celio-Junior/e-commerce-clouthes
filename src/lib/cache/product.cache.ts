import { productRepository } from '@/repository/product';

import { cacheTag } from 'next/cache';
import { cache } from 'react';

export const cacheProductAll = cache(async () => {
  'use cache';
  cacheTag('products');
  return await productRepository.findAllPublic();
});
