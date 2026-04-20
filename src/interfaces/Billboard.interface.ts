export type BillboardModelInterface = {
  id: string;
  label: string;
  image_url: string;
};

export type BillboardAttributesInterface = Omit<BillboardModelInterface, 'id'>;

export type BillboardRepositoryInterface = {
  create(BillboardCreate: BillboardAttributesInterface): Promise<BillboardAttributesInterface>;
  findAll(): Promise<BillboardModelInterface[]>;
  findAllImages(): Promise<string[]>;
  findOne(billboard: Partial<BillboardModelInterface>): Promise<BillboardAttributesInterface>;
  update(): void;
};
