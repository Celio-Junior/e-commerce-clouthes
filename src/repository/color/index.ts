import { initDB } from '@/database';
import { ColorCreateType, ColorPublicType, ColorRepositoryInterface } from '@/interfaces/Color.interface';
import Color from '@/models/Color.model';

class ColorRepository implements ColorRepositoryInterface {
  constructor() {
    initDB();
  }

  async create({ name, value }: ColorCreateType): Promise<void> {
    const isColor = await Color.findOne({
      where: {
        name,
        value,
      },
    });

    if (isColor) throw new Error('Color already exists');

    await Color.create(
      { name, value },
      {
        raw: true,
      },
    );
  }
  async findAllPublic(): Promise<ColorPublicType[]> {
    return (
      await Color.findAll({
        raw: true,
      })
    ).map((color) => ({
      id: color.id,
      name: color.name,
      value: color.value,
      createdAt: color.createdAt,
    }));
  }
  async findById(id: string): Promise<ColorPublicType> {
    if (!id) throw new Error('id is empty');

    const color = await Color.findByPk(id, { raw: true, nest: true });
    if (!color) throw new Error('fail at search value');

    return color;
  }

  async update(id: string, { name, value }: ColorCreateType): Promise<string> {
    const isColor = await Color.findByPk(id);

    if (!isColor) throw new Error('Value already exists');

    if (isColor.name === name && isColor.value === value)
      throw new Error('Color not changed, already exists');
    await isColor.update({ name, value });
    return isColor.id;
  }

  async remove(id: string): Promise<void> {
    if (!id) throw new Error('id is empty');

    const color = await Color.findByPk(id);
    if (!color) throw new Error('fail at search Color');

    await color.destroy();
  }
}

export const colorRepository = new ColorRepository();
