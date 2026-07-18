'use server';

import { SizeActionType } from '@/interfaces/Size.interface';
import { EXPIRE_TAG_CACHE } from '@/lib/constants';

import { SizeUpdateFormSchema, SizeUpdateFormType } from '@/lib/validations/size';
import { sizeRepository } from '@/repository/size';
import { formatZodMessage } from '@/utils/formats-functions';
import { revalidateTag } from 'next/cache';

export default async function sizeUpdateAction(data: SizeUpdateFormType): Promise<SizeActionType> {
  const validSizeForm = SizeUpdateFormSchema.safeParse(data);

  if (!validSizeForm.success) {
    return {
      errors: formatZodMessage(validSizeForm.error),
      success: false,
    };
  }
  try {
    const sizeData = validSizeForm.data;
    await sizeRepository.update(sizeData.id, sizeData);

    revalidateTag('sizes', { expire: EXPIRE_TAG_CACHE });
    return {
      success: true,
      data: 'ok',
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
