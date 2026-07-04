import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import Product from './Product';
import { ImageProductModelType, ImageProductPublicType } from '@/interfaces/Product..interface';

@Table({
  timestamps: true,
  underscored: true,
  modelName: 'ImageProduct',
  tableName: 'imageProducts',
})
export default class ImageProduct extends Model<ImageProductModelType, ImageProductPublicType> {
  @PrimaryKey
  @Column({ allowNull: false, type: DataType.STRING(150) })
  declare id: string;

  @Column({ allowNull: false, type: DataType.STRING(180) })
  declare url: string;

  @ForeignKey(() => Product)
  @Column({ allowNull: false, type: DataType.UUIDV4 })
  declare product_id: string;
  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @BelongsTo(() => Product)
  declare products: Product;
}
