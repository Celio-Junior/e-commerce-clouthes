import { colorRepository } from '@/repository/color';

import { cacheTag } from 'next/cache';
import { cache } from 'react';

export const cacheColorAll = cache(async () => {
  'use cache';
  cacheTag('colors');
  return await colorRepository.findAllPublic();
});
