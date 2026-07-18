'use server';

import { ColorActionType } from '@/interfaces/Color.interface';

import { EXPIRE_TAG_CACHE } from '@/lib/constants';

import { SizeCreateFormSchema, SizeCreateFormType } from '@/lib/validations/size';
import { colorRepository } from '@/repository/color';

import { formatZodMessage } from '@/utils/formats-functions';
import { revalidateTag } from 'next/cache';

export default async function colorCreateAction(data: SizeCreateFormType): Promise<ColorActionType> {
  const validSizeForm = SizeCreateFormSchema.safeParse(data);

  if (!validSizeForm.success) {
    return {
      errors: formatZodMessage(validSizeForm.error),
      success: false,
    };
  }

  try {
    await colorRepository.create(validSizeForm.data);

    revalidateTag('colors', { expire: EXPIRE_TAG_CACHE });
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
