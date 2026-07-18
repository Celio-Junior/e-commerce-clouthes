'use server';

import { EXPIRE_TAG_CACHE } from '@/lib/constants';

import { sizeRepository } from '@/repository/size';
import { revalidateTag } from 'next/cache';

type BillboardDeleteActionType = {
  id: string;
};

export default async function sizeDeleteAction(data: BillboardDeleteActionType) {
  const { id } = data;

  try {
    await sizeRepository.remove(id);
    revalidateTag('sizes', { expire: EXPIRE_TAG_CACHE });
  } catch (e) {
    if (e instanceof Error) {
      return {
        errors: [e.message],
        success: false,
      };
    }
    return {
      errors: ['error na database'],
      success: false,
    };
  }
}
