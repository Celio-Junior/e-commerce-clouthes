import { ProductCreateType, ProductModelType } from '@/interfaces/Product..interface';
import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import Category from './Category';
import Size from './Size.model';
import Color from './Color.model';
import ImageProduct from './ImageProduct.model';

@Table({
  underscored: true,
  timestamps: true,
  tableName: 'products',
  modelName: 'Product',
})
export default class Product extends Model<ProductModelType, ProductCreateType> {
  @PrimaryKey
  @Column({ allowNull: false, type: DataType.UUIDV4, defaultValue: DataType.UUIDV4 })
  declare id: string;
  @Column({ allowNull: false, type: DataType.STRING(150) })
  declare name: string;

  @Column({ allowNull: false, type: DataType.DECIMAL(10, 2), defaultValue: 0 })
  declare price: number;

  @ForeignKey(() => Category)
  @Column({ allowNull: false, type: DataType.UUIDV4 })
  declare category_id: string;

  @ForeignKey(() => Size)
  @Column({ allowNull: false, type: DataType.UUIDV4 })
  declare size_id: string;

  @ForeignKey(() => Color)
  @Column({ allowNull: false, type: DataType.UUIDV4 })
  declare color_id: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @BelongsTo(() => Category)
  declare category: Category;

  @BelongsTo(() => Size)
  declare size: Size;

  @BelongsTo(() => Color)
  declare color: Color;

  @HasMany(() => ImageProduct)
  declare imagesProducts: ImageProduct[];
}
