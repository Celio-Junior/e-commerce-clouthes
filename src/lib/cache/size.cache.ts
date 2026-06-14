import { sizeRepository } from '@/repository/size';
import { cacheTag } from 'next/cache';
import { cache } from 'react';

export const cacheSizeAll = cache(async () => {
  'use cache';
  cacheTag('sizes');
  return await sizeRepository.findAllPublic();
});
