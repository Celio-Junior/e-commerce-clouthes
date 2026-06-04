import { initDB } from '@/database';
import {
  CategoryModelType,
  CategoryCreateType,
  CategoryRepositoryInterface,
  CategoryPublicType,
} from '@/interfaces/Category.interface';
import Category from '@/models/Category';

//TODO fazendo repository, e ver relacionamento com billboard
class CategoryRepository implements CategoryRepositoryInterface {
  constructor() {
    initDB();
  }

  async create({ name, billboard_id }: CategoryCreateType): Promise<CategoryModelType> {
    const isCategory = await Category.findOne({
      where: {
        name,
        billboard_id,
      },
    });

    if (isCategory) throw new Error('Category already exists');

    return await Category.create(
      { name, billboard_id },
      {
        raw: true,
      },
    );
  }
  async findAllPublic(): Promise<CategoryPublicType[]> {
    return (
      await Category.findAll({
        include: {
          association: 'billboard',
        },
        raw: true,
        nest: true,
      })
    ).map((category) => ({
      id: category.id,
      name: category.name,
      billboard: category.billboard.label,
      createdAt: category.createdAt,
    }));
  }
}

export const categoryRepository = new CategoryRepository();
