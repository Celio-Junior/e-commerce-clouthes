'use server';

import { CategoryActionType } from '@/interfaces/Category.interface';
import { EXPIRE_TAG_BILLBOARDS } from '@/lib/constants';

import { CategoryCreateFormSchema, CategoryCreateFormType } from '@/lib/validations/category';
import { categoryRepository } from '@/repository/category';

import { formatZodMessage } from '@/utils/formats-functions';
import { revalidateTag } from 'next/cache';

export default async function categoryCreateAction(
  data: CategoryCreateFormType,
): Promise<CategoryActionType> {
  const validCategoryForm = CategoryCreateFormSchema.safeParse(data);

  if (!validCategoryForm.success) {
    return {
      errors: formatZodMessage(validCategoryForm.error),
      success: false,
    };
  }

  try {
    const category = await categoryRepository.create(validCategoryForm.data);
    // VER O REPOSITORY DO CATEGORIES FAZER OS METODOS
    revalidateTag('categories', { expire: EXPIRE_TAG_BILLBOARDS });
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
