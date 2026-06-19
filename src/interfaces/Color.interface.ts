import { SizeModelType } from './Size.interface';

export type ColorModelType = SizeModelType;

export type ColorCreateType = Pick<ColorModelType, 'name' | 'value'>;

export type ColorPublicType = Pick<ColorModelType, 'id' | 'createdAt'> & ColorCreateType;

export interface ColorRepositoryInterface {
  create(data: ColorCreateType): Promise<void>;
  update(id: string, data: ColorCreateType): Promise<string>;
  findAllPublic(): Promise<ColorPublicType[]>;
  findById(id: string): Promise<ColorPublicType>;
  remove(id: string): Promise<void>;
}

export type ColorActionType =
  | {
      errors: string[];
      success: false;
    }
  | {
      success: true;
      data: string;
    };
