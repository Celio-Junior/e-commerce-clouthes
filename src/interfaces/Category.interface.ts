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
  findAllPublic(): Promise<CategoryPublicType[]>;
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
