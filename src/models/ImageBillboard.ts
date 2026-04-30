import {
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import Billboard from './Billboards';
import { ImgAttributesType, ImgModelType } from '@/interfaces/Billboard.interface';

@Table({
  timestamps: true,
  underscored: true,
  modelName: 'ImageBillboards',
  tableName: 'imageBillboards',
})
export default class ImageBillboard extends Model<ImgModelType, ImgAttributesType> {
  @PrimaryKey
  @Column({ allowNull: false, type: DataType.UUIDV4, defaultValue: DataType.UUIDV4 })
  declare id: string;
  @Column({ allowNull: false, type: DataType.STRING(180) })
  declare url: string;

  @HasMany(() => Billboard, 'image_id')
  // @HasMany(hasManyBillboards())
  declare billboards: Billboard[];

  @CreatedAt
  declare createdAt: Date;
  @UpdatedAt
  declare updatedAt: Date;
}
