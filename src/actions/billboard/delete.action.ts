'use server';

import { billboardRepository } from '@/repository/billboard';
import { revalidateTag } from 'next/cache';

type BillboardDeleteActionType = {
  id: string;
};

export default async function billboardDelete(data: BillboardDeleteActionType) {
  const { id } = data;

  try {
    await billboardRepository.remove(id);
    revalidateTag('billboards', { expire: 1000 * 60 * 2 });
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
