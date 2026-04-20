import {
  BillboardAttributesInterface,
  BillboardModelInterface,
  BillboardRepositoryInterface,
} from '@/interfaces/Billboard.interface';
import Billboard from '@/models/Billboards';

class BillboardRepository implements BillboardRepositoryInterface {
  async create(BillboardCreate: BillboardAttributesInterface): Promise<BillboardAttributesInterface> {
    const isBillboard = await Billboard.findOne({ where: BillboardCreate });
    if (isBillboard) throw new Error('Billboard already exists');
    return await Billboard.create(BillboardCreate);
  }
  findAll(): Promise<BillboardModelInterface[]> {
    throw new Error('Method not implemented.');
  }
  async findAllImages(): Promise<string[]> {
    // return await Billboard.findAll({ attributes: ['image_url'] });
    return (await Billboard.findAll()).map((billboard) => billboard.image_url);
  }
  // }

  findOne(billboard: Partial<BillboardModelInterface>): Promise<BillboardAttributesInterface> {
    throw new Error('Method not implemented.');
  }

  update(): void {
    throw new Error('Method not implemented.');
  }
}

export const billboardRepository = new BillboardRepository();
