import { billboardRepository } from '@/repository/billboard';
import { cacheTag } from 'next/cache';
import { cache } from 'react';

export const billCacheAllImages = cache(async () => {
  'use cache';
  cacheTag('billboardImages');
  return await billboardRepository.findAllImages();
});
export const billCacheAllBillboards = cache(async () => {
  'use cache';
  cacheTag('billboards');
  return billboardRepository.findAllPublic();
});
