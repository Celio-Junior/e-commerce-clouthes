'use server';

import { CategoryActionType } from '@/interfaces/Category.interface';
import { EXPIRE_TAG_CACHE } from '@/lib/constants';

import { CategoryUpdateFormSchema, CategoryUpdateFormType } from '@/lib/validations/category';

import { categoryRepository } from '@/repository/category';
import { formatZodMessage } from '@/utils/formats-functions';
import { revalidateTag } from 'next/cache';

export default async function categoryUpdateAction(
  data: CategoryUpdateFormType,
): Promise<CategoryActionType> {
  const validCategoryForm = CategoryUpdateFormSchema.safeParse(data);

  if (!validCategoryForm.success) {
    return {
      errors: formatZodMessage(validCategoryForm.error),
      success: false,
    };
  }
  try {
    const categoryData = validCategoryForm.data;
    const categoryId = await categoryRepository.update(categoryData.id, categoryData);

    revalidateTag('colors', { expire: EXPIRE_TAG_CACHE });
    return {
      success: true,
      data: categoryId,
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
