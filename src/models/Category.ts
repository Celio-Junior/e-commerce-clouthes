import { CategoryModelType, CategoryCreateType } from '@/interfaces/Category.interface';
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
import Billboard from './Billboard';

@Table({ tableName: 'categories', modelName: 'Category', timestamps: true, underscored: true })
export default class Category extends Model<CategoryModelType, CategoryCreateType> {
  @PrimaryKey
  @Column({ allowNull: false, type: DataType.UUIDV4, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @PrimaryKey
  @Column({ allowNull: false, type: DataType.STRING(150), unique: true })
  declare name: string;

  @ForeignKey(() => Billboard)
  @Column({ allowNull: false, type: DataType.STRING, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare billboard_id: string;

  @BelongsTo(() => Billboard)
  declare billboard: Billboard;
  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
