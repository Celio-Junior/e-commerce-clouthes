export type CategoryModelType = {
  id: string;
  name: string;
  billboard_id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryPublicType = Pick<CategoryModelType, 'name' | 'billboard_id'>;

export interface CategoryRepositoryInterface {
  create(data: CategoryPublicType): Promise<void>;
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
