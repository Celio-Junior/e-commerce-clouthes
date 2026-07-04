import { initDB } from '@/database';
import {
  BillCreateAtributesType,
  BillboardModelType,
  BillboardRepositoryInterface,
  ImgPublicType,
} from '@/interfaces/Billboard.interface';
import Billboard from '@/models/Billboard';
import ImageBillboard from '@/models/ImageBillboard';
import { Op } from 'sequelize';

class BillboardRepository implements BillboardRepositoryInterface {
  constructor() {
    initDB();
  }
  async create({ label, image_id, image_url }: BillCreateAtributesType): Promise<string> {
    const isBillboard = await Billboard.findOne({
      // where: { label: BillboardCreate.label, image_id: BillboardCreate.image_id },
      where: {
        [Op.or]: [{ label }, { image_id }],
      },
      include: {
        association: 'images',
      },
      raw: true,
      nest: true,
    });
    /*
    Quando você faz uma consulta, pode passar a opção raw: true. Isso faz com que o Sequelize não crie uma "instância" (com métodos como .save(), .update()), mas retorne apenas os dados.raw: true: Retorna um objeto "achatado" (ex: categoria.nome vira categoria.nome como chave única).nest: true: Usado junto com raw, organiza as associações em objetos aninhados( pois sem ele osbjetos fica no mesmo nivel, n tem subobjetos, ele faz isso, essa "hierarquia").
    isBillboard?.reload() => methodo que carrega que você recarrega e outras coias
    */
    // console.log('isbillboard', isBillboard?.reload());

    if (isBillboard && isBillboard.label === label) throw new Error('Billboard already exists');

    if (isBillboard?.image_id !== image_id || !isBillboard) {
      const imageExist = await ImageBillboard.findByPk(image_id);
      if (!imageExist) await ImageBillboard.create({ url: image_url, id: image_id });
    }

    // if (!isBillboard) {
    //   await ImageBillboard.create({ url: image_url, id: image_id });
    // }
    await Billboard.create({ label, image_id });
    return image_id;
  }

  private async findAll(): Promise<BillboardModelType[]> {
    return await Billboard.findAll();
  }
  async findAllPublic(): Promise<BillboardModelType[]> {
    return await Billboard.findAll({ raw: true, nest: true });
  }
  async findAllImages(): Promise<ImgPublicType[]> {
    const imagesBillboards = await ImageBillboard.findAll({ attributes: ['url', 'id'] });
    return imagesBillboards.map((images) => ({ id: images.id, url: images.url }));
  }

  async findById(id: string): Promise<BillboardModelType> {
    if (!id) throw new Error('id is empty');

    const billboard = await Billboard.findByPk(id, { raw: true, nest: true });
    if (!billboard) throw new Error('fail at search billboard');

    return billboard;
  }

  findOne(billboard: Partial<BillboardModelType>): Promise<BillCreateAtributesType> {
    throw new Error('Method not implemented.');
  }

  async update(id: string, { label, image_id, image_url }: BillCreateAtributesType): Promise<string> {
    const isBillboard = await Billboard.findByPk(id, {
      include: {
        association: 'images',
        foreignKey: 'image_id',
      },
    });

    if (!isBillboard) throw new Error('Billboard already exists');

    if (isBillboard.label === label && isBillboard.image_id === image_id)
      throw new Error('Billboard not changed, already exists');

    if (isBillboard.image_id !== image_id) {
      const imageExist = await ImageBillboard.findByPk(image_id);
      if (!imageExist) await ImageBillboard.create({ url: image_url, id: image_id });
    }

    await isBillboard.update({ label, image_id });
    return image_id;
  }

  async remove(id: string): Promise<void> {
    if (!id) throw new Error('id is empty');

    const billboard = await Billboard.findByPk(id);
    if (!billboard) throw new Error('fail at search billboard');

    await billboard.destroy();
  }

  async removeImages(id: string): Promise<void> {
    if (!id) throw new Error('id image is empty');
    const image = await ImageBillboard.findByPk(id);

    if (!image) throw new Error('fail at search image');

    await image.destroy();
  }
}

export const billboardRepository = new BillboardRepository();
