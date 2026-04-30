import { initDB } from '@/database';
import {
  BillCreateAtributesType,
  BillboardModelType,
  BillboardRepositoryInterface,
  ImgModelType,
} from '@/interfaces/Billboard.interface';
import Billboard from '@/models/Billboards';
import ImageBillboard from '@/models/ImageBillboard';

class BillboardRepository implements BillboardRepositoryInterface {
  constructor() {
    initDB();
  }
  async create(BillboardCreate: BillCreateAtributesType): Promise<string> {
    const isBillboard = await Billboard.findOne({
      where: { label: BillboardCreate.label },
      include: {
        association: 'images',
      },
      raw: true,
      nest: true,
    });
    /*
    Quando você faz uma consulta, pode passar a opção raw: true. Isso faz com que o Sequelize não crie uma "instância" (com métodos como .save(), .update()), mas retorne apenas os dados.raw: true: Retorna um objeto "achatado" (ex: categoria.nome vira categoria.nome como chave única).nest: true: Usado junto com raw, organiza as associações em objetos aninhados.
    isBillboard?.reload() => methodo que carrega que você regacarrega e outras coias
    */
    // console.log('isbillboard', isBillboard?.reload());

    let idImg = '';

    if (!BillboardCreate.image_id) {
      const imageBillboard = await ImageBillboard.create({ url: BillboardCreate.image_url });
      idImg = imageBillboard.id;
    }
    if (isBillboard) throw new Error('Billboard already exists');

    await Billboard.create({ label: BillboardCreate.label, image_id: BillboardCreate.image_id ?? idImg });
    return idImg;
  }

  findAll(): Promise<BillboardModelType[]> {
    throw new Error('Method not implemented.');
  }
  async findAllImages(): Promise<ImgModelType[]> {
    const imagesBillboards = await ImageBillboard.findAll({ attributes: ['url', 'id'] });
    return imagesBillboards.map((images) => ({ id: images.id, url: images.url }));
  }
  // }

  findOne(billboard: Partial<BillboardModelType>): Promise<BillCreateAtributesType> {
    throw new Error('Method not implemented.');
  }

  update(): void {
    throw new Error('Method not implemented.');
  }

  remove() {}
}

export const billboardRepository = new BillboardRepository();
