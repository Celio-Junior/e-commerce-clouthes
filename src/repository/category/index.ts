import { initDB } from '@/database';
import {
  CategoryModelType,
  CategoryCreateType,
  CategoryRepositoryInterface,
  CategoryPublicType,
} from '@/interfaces/Category.interface';
import Category from '@/models/Category';

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
  async findById(id: string): Promise<CategoryModelType> {
    if (!id) throw new Error('id is empty');

    const category = await Category.findByPk(id, { raw: true, nest: true });
    if (!category) throw new Error('fail at search billboard');

    return category;
  }

  async update(id: string, { name, billboard_id }: CategoryCreateType): Promise<string> {
    const isCategory = await Category.findByPk(id, {
      include: {
        association: 'billboard',
        foreignKey: 'billboard_id',
      },
    });

    if (!isCategory) throw new Error('Billboard already exists');

    if (isCategory.name === name && isCategory.billboard_id === billboard_id)
      throw new Error('Category not changed, already exists');
    await isCategory.update({ name, billboard_id });
    return isCategory.id;
  }

  async remove(id: string): Promise<void> {
    if (!id) throw new Error('id is empty');

    const category = await Category.findByPk(id);
    if (!category) throw new Error('fail at search category');

    await category.destroy();
  }
}

export const categoryRepository = new CategoryRepository();
