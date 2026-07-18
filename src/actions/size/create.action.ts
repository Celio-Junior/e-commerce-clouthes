'use server';

import { SizeActionType } from '@/interfaces/Size.interface';
import { EXPIRE_TAG_CACHE } from '@/lib/constants';

import { SizeCreateFormSchema, SizeCreateFormType } from '@/lib/validations/size';

import { sizeRepository } from '@/repository/size';

import { formatZodMessage } from '@/utils/formats-functions';
import { revalidateTag } from 'next/cache';

export default async function SizeCreateAction(data: SizeCreateFormType): Promise<SizeActionType> {
  const validSizeForm = SizeCreateFormSchema.safeParse(data);

  if (!validSizeForm.success) {
    return {
      errors: formatZodMessage(validSizeForm.error),
      success: false,
    };
  }

  try {
    await sizeRepository.create(validSizeForm.data);

    revalidateTag('sizes', { expire: EXPIRE_TAG_CACHE });
    return {
      success: true,
      data: '',
    };
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
