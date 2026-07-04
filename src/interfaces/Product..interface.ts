import { ProductCreateFormType } from '@/lib/validations/product';
import { ColorActionType } from './Color.interface';

export type ProductModelType = {
  id: string;
  name: string;
  price: number;
  category_id: string;
  size_id: string;
  color_id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ImageProductModelType = {
  id: string;
  url: string;
  product_id: string;
  createdAt: Date;
  updatedAt: Date;
};
export type ImageProductPublicType = Omit<ImageProductModelType, 'createdAt' | 'updatedAt'>;

export type ProductCreateType = ProductCreateFormType;
export type ProductPublicType = Pick<ProductModelType, 'id' | 'name' | 'price' | 'createdAt'> & {
  color: string;
  category: string;
  size: string;
};
export interface ProductRepositoryInterface {
  create(data: ProductCreateType): Promise<void>;
  update(id: string, data: ProductCreateType): Promise<void>;
  findAllPublic(): Promise<ProductPublicType[]>;
  findById(id: string): Promise<ProductPublicType>;
  remove(id: string): Promise<void>;
  removeImages(id: string): Promise<void>;
}

export type ProductActionType = ColorActionType;
