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
import { ImgModelType, ImgPublicType } from '@/interfaces/Billboard.interface';

@Table({
  timestamps: true,
  underscored: true,
  modelName: 'ImageBillboards',
  tableName: 'imageBillboards',
})
export default class ImageBillboard extends Model<ImgModelType, ImgPublicType> {
  @PrimaryKey
  @Column({ allowNull: false, type: DataType.STRING })
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
