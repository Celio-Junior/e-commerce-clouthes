import { initDB } from '@/database';

import {
  ProductCreateType,
  ProductPublicType,
  ProductRepositoryInterface,
} from '@/interfaces/Product..interface';

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

    await Product.create(data, {
      raw: true,
    });
  }
  async findAllPublic(): Promise<ProductPublicType[]> {
    return (
      await Product.findAll({
        raw: true,
      })
    ).map(this.productsMap);
  }
  async findById(id: string): Promise<ProductPublicType> {
    if (!id) throw new Error('id is empty product');

    const product = await Product.findByPk(id, { raw: true, nest: true });
    if (!product) throw new Error('fail at search value');

    return {
      id,
      category: product.category.name,
      size: product.size.name,
      color: product.color.name,
      price: product.price,
      name: product.name,
      createdAt: product.createdAt,
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
}

export const productRepository = new ProductRepository();
