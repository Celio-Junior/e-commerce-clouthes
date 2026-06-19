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
import Product from './Product';

@Table({ tableName: 'colors', modelName: 'Color', timestamps: true, underscored: true })
export default class Color extends Model {
  @PrimaryKey
  @Column({ allowNull: false, type: DataType.UUIDV4, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @PrimaryKey
  @Column({ allowNull: false, type: DataType.STRING(150), unique: true })
  declare name: string;
  @Column({ allowNull: false, type: DataType.STRING(60) })
  declare value: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @HasMany(() => Product)
  declare products: Product[];
}
