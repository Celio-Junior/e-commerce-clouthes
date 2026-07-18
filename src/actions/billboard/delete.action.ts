'use server';

import { EXPIRE_TAG_CACHE } from '@/lib/constants';
import { billboardRepository } from '@/repository/billboard';
import { revalidateTag } from 'next/cache';

type BillboardDeleteActionType = {
  id: string;
};

export default async function billboardDeleteAction(data: BillboardDeleteActionType) {
  const { id } = data;

  try {
    await billboardRepository.remove(id);
    revalidateTag('billboards', { expire: EXPIRE_TAG_CACHE });
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

export async function billboardImageDeleteAction(id: string) {
  try {
    await billboardRepository.removeImages(id);
    revalidateTag('billboardImages', { expire: EXPIRE_TAG_CACHE });
  } catch (e) {
    // if (e instanceof Error) {
    //   return {
    //     errors: [e.message],
    //     success: false,
    //   };
    // }
    // return {
    //   errors: ['error na database'],
    //   success: false,
    // };
  }
}
