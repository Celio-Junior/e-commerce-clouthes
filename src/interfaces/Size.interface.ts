export type SizeModelType = {
  id: string;
  name: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SizeCreateType = Pick<SizeModelType, 'name' | 'value'>;

export type SizePublicType = Pick<SizeModelType, 'id' | 'createdAt'> & SizeCreateType;

export interface SizeRepositoryInterface {
  create(data: SizeCreateType): Promise<void>;
  update(id: string, data: SizeCreateType): Promise<string>;
  findAllPublic(): Promise<SizePublicType[]>;
  findById(id: string): Promise<SizePublicType>;
  remove(id: string): Promise<void>;
}

export type SizeActionType =
  | {
      errors: string[];
      success: false;
    }
  | {
      success: true;
      data: string;
    };
