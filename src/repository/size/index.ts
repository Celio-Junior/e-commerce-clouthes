import { initDB } from '@/database';
import { SizeCreateType, SizePublicType, SizeRepositoryInterface } from '@/interfaces/Size.interface';
import Size from '@/models/Size.model';

class SizeRepository implements SizeRepositoryInterface {
  constructor() {
    initDB();
  }

  async create({ name, value }: SizeCreateType): Promise<void> {
    const isSize = await Size.findOne({
      where: {
        name,
        value,
      },
    });

    if (isSize) throw new Error('Size already exists');

    await Size.create(
      { name, value },
      {
        raw: true,
      },
    );
  }
  async findAllPublic(): Promise<SizePublicType[]> {
    return (
      await Size.findAll({
        raw: true,
      })
    ).map((size) => ({
      id: size.id,
      name: size.name,
      value: size.value,
      createdAt: size.createdAt,
    }));
  }
  async findById(id: string): Promise<SizePublicType> {
    if (!id) throw new Error('id is empty');

    const size = await Size.findByPk(id, { raw: true, nest: true });
    if (!size) throw new Error('fail at search value');

    return size;
  }

  async update(id: string, { name, value }: SizeCreateType): Promise<string> {
    const isSize = await Size.findByPk(id);

    if (!isSize) throw new Error('Value already exists');

    if (isSize.name === name && isSize.value === value) throw new Error('Size not changed, already exists');
    await isSize.update({ name, value });
    return isSize.id;
  }

  async remove(id: string): Promise<void> {
    if (!id) throw new Error('id is empty');

    const size = await Size.findByPk(id);
    if (!size) throw new Error('fail at search Size');

    await size.destroy();
  }
}

export const sizeRepository = new SizeRepository();
