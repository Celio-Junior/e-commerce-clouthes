import { initDB } from '@/database';

import {
  ImageProductPublicType,
  ProductCreateType,
  ProductPublicType,
  ProductRepositoryInterface,
} from '@/interfaces/Product..interface';
import ImageProduct from '@/models/ImageProduct.model';

import Product from '@/models/Product';

class ProductRepository implements ProductRepositoryInterface {
  constructor() {
    initDB();
  }

  private productsMap(product: Product): ProductPublicType {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category.name,
      size: product.size.name,
      color: product.color.name,
      createdAt: product.createdAt,
    };
  }

  async create(data: ProductCreateType): Promise<void> {
    const isProduct = await Product.findOne({ where: { name: data.name } });

    if (isProduct) throw new Error('Product already exists');
    const product = await Product.create(data, {
      raw: true,
    });

    await ImageProduct.create({ id: data.id_image, url: data.image_url, product_id: product.id });
  }
  async findAllPublic(): Promise<ProductPublicType[]> {
    return (
      await Product.findAll({
        raw: true,
        nest: true,
        include: [{ association: 'category' }, { association: 'size' }, { association: 'color' }],
      })
    ).map(this.productsMap);
  }
  async findById(id: string): Promise<ProductPublicType & { images: ImageProductPublicType[] }> {
    if (!id) throw new Error('id is empty product');

    const product = await Product.findByPk(id, {
      // raw: true,
      nest: true,
      include: [
        { association: 'category' },
        { association: 'size' },
        { association: 'color' },
        { association: 'imagesProducts' },
      ],
    });
    if (!product) throw new Error('fail at search value');

    return {
      id,
      category: product.category.id,
      size: product.size.id,
      color: product.color.id,
      price: product.price,
      name: product.name,
      createdAt: product.createdAt,
      //ta objeto
      images: product.imagesProducts.map((imagePro) => ({
        id: imagePro.id,
        url: imagePro.url,
        product_id: imagePro.product_id,
      })),
    };
  }

  async update(id: string, data: ProductCreateType): Promise<void> {
    const isProduct = await Product.findByPk(id);

    if (!isProduct) throw new Error('Value already exists');

    if (isProduct.name === data.name) throw new Error('Product not changed, already exists');
    await isProduct.update(data);
  }

  async remove(id: string): Promise<void> {
    if (!id) throw new Error('id is empty');

    const product = await Product.findByPk(id);
    if (!product) throw new Error('fail at search product');

    await product.destroy();
  }
  async removeImages(id: string): Promise<void> {
    if (!id) throw new Error('id image is empty');
    const image = await ImageProduct.findByPk(id);

    if (!image) throw new Error('fail at search image');

    await image.destroy();
  }
}

export const productRepository = new ProductRepository();
