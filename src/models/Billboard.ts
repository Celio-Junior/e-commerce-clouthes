import { BillboardModelType, BillboardPublicType } from '@/interfaces/Billboard.interface';
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
import ImageBillboard from './ImageBillboard';
import Category from './Category';

@Table({
  underscored: true,
  timestamps: true,
  tableName: 'billboards',
  modelName: 'Billboard',
})
export default class Billboard extends Model<BillboardModelType, BillboardPublicType> {
  @PrimaryKey
  @Column({ allowNull: false, type: DataType.UUIDV4, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @Column({
    type: DataType.STRING(80),
    allowNull: false,
  })
  declare label: string;

  @ForeignKey(() => ImageBillboard)
  @Column({ allowNull: false, type: DataType.STRING })
  declare image_id: string;

  // declare categories: string[];
  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @HasMany(() => Category, 'billboard_id')
  declare categories: Category[];

  @BelongsTo(() => ImageBillboard, 'image_id')
  declare images: ImageBillboard;
}
