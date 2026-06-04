import { categoryRepository } from '@/repository/category';
import { cacheTag } from 'next/cache';
import { cache } from 'react';

export const cacheCategoryAll = cache(async () => {
  'use cache';
  cacheTag("category's");
  return await categoryRepository.findAllPublic();
});
