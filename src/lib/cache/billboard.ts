import { billboardRepository } from '@/repository/billboard';
import { cacheTag } from 'next/cache';
import { cache } from 'react';

export const cacheBillImgsAll = cache(async () => {
  'use cache';
  cacheTag('billboardImages');
  return await billboardRepository.findAllImages();
});
export const cacheBillboardsAll = cache(async () => {
  'use cache';
  cacheTag('billboards');
  return billboardRepository.findAllPublic();
});
