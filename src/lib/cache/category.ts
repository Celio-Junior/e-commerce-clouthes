import { categoryRepository } from '@/repository/category';
import { cacheTag } from 'next/cache';
import { cache } from 'react';

export const cacheCategoryAll = cache(async () => {
  'use cache';
  cacheTag('categorys');
  return await categoryRepository.findAllPublic();
});
