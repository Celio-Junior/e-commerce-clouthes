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

export type ProductCreateType = Omit<ProductModelType, 'id' | 'createdAt' | 'updatedAt'>;
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
}
