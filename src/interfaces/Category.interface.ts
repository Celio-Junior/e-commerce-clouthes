export type CategoryModelType = {
  id: string;
  name: string;
  billboard_id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryCreateType = Pick<CategoryModelType, 'name' | 'billboard_id'>;

export type CategoryPublicType = {
  id: CategoryModelType['id'];
  name: CategoryModelType['name'];
  billboard: string;
  createdAt: CategoryModelType['createdAt'];
};
export interface CategoryRepositoryInterface {
  create(data: CategoryCreateType): Promise<CategoryModelType>;
  update(id: string, data: CategoryCreateType): Promise<string>;
  findAllPublic(): Promise<CategoryPublicType[]>;
  findById(id: string): Promise<CategoryModelType>;
  remove(id: string): Promise<void>;
}

export type CategoryActionType =
  | {
      errors: string[];
      success: false;
    }
  | {
      success: true;
      data: string;
    };
