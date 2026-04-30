//Models
export type BillboardModelType = {
  id: string;
  label: string;
  image_id: string;
};
export type ImgModelType = {
  id: string;
  url: string;
};

//Repository
export type ImgAttributesType = Omit<ImgModelType, 'id'>;
export type BillAttributesType = Pick<BillboardModelType, 'label'>;
export type BillCreateAtributesType = BillAttributesType & { image_url: string; image_id: string | null };

export type BillboardRepositoryInterface = {
  create(BillboardCreate: BillCreateAtributesType): Promise<string>;
  findAll(): Promise<BillboardModelType[]>;
  findAllImages(): Promise<ImgModelType[]>;
  findOne(billboard: Partial<BillboardModelType>): Promise<BillAttributesType>;
  update(): void;
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
