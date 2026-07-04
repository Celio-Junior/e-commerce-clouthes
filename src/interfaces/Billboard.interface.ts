//Models
export type BillboardModelType = {
  id: string;
  label: string;
  image_id: string;
  createdAt: Date;
  updatedAt: Date;
};
export type BillboardPublicType = Omit<BillboardModelType, 'createdAt' | 'updatedAt' | 'id'>;

export type ImgModelType = {
  id: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ImgPublicType = Omit<ImgModelType, 'createdAt' | 'updatedAt'>;
//Repository

export type BillCreateAtributesType = Pick<BillboardPublicType, 'label' | 'image_id'> & { image_url: string };

export type BillboardRepositoryInterface = {
  create(BillboardCreate: BillCreateAtributesType): Promise<string>;
  // findAll(): Promise<BillboardModelType[]>;
  findAllPublic(): Promise<BillboardModelType[]>;
  findAllImages(): Promise<ImgPublicType[]>;
  removeImages(id: string): Promise<void>;
  findOne(billboard: Partial<BillboardModelType>): Promise<BillboardPublicType>;
  findById(id: string): Promise<BillboardModelType>;
  update(id: string, data: BillCreateAtributesType): Promise<string>;
  remove(id: string): Promise<void>;
};

//action
export type BillboardActionType =
  | {
      errors: string[];
      success: false;
    }
  | {
      success: true;
      data: string;
    };
