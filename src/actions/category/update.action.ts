'use server';

import { CategoryActionType } from '@/interfaces/Category.interface';
import { EXPIRE_TAG_BILLBOARDS } from '@/lib/constants';
import { BillboardUpdateFormSchema } from '@/lib/validations/billboard';
import { CategoryCreateFormType } from '@/lib/validations/category';
import { billboardRepository } from '@/repository/billboard';
import { formatZodMessage } from '@/utils/formats-functions';
import { revalidateTag } from 'next/cache';

export default async function categoryUpdateAction(
  data: CategoryCreateFormType,
): Promise<CategoryActionType> {
  const validCategoryForm = BillboardUpdateFormSchema.safeParse(data);

  if (!validCategoryForm.success) {
    return {
      errors: formatZodMessage(validCategoryForm.error),
      success: false,
    };
  }

  try {
    const billboardData = validCategoryForm.data;
    const imgId = await billboardRepository.update(billboardData.id, billboardData);
    revalidateTag('billboards', { expire: EXPIRE_TAG_BILLBOARDS });
    return {
      success: true,
      data: imgId,
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
