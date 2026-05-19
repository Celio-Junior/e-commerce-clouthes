import { CategoryModelType, CategoryPublicType } from '@/interfaces/Category.interface';
import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  UpdatedAt,
} from 'sequelize-typescript';
import Billboard from './Billboards';

export default class Category extends Model<CategoryModelType, CategoryPublicType> {
  @PrimaryKey
  @Column({ allowNull: false, type: DataType.UUIDV4, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @Column({ allowNull: false, type: DataType.STRING(150) })
  declare name: string;
  @ForeignKey(() => Billboard)
  declare billboard_id: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @BelongsTo(() => Category, 'billboard_id')
  declare category: Category;
}
