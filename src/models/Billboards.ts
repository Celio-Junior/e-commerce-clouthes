import { SequelizeInit } from '@/database';
import { BillboardModelInterface } from '@/interfaces/Billboard.interface';
import { Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@SequelizeInit
@Table({
  underscored: true,
  timestamps: true,
  tableName: 'billboards',
  modelName: 'Billboard',
})
export default class Billboard extends Model<BillboardModelInterface, Omit<BillboardModelInterface, 'id'>> {
  @PrimaryKey
  @Column({ allowNull: false, type: DataType.UUIDV4, defaultValue: DataType.UUIDV4 })
  declare id: string;
  @Column({
    type: DataType.STRING(80),
    allowNull: false,
  })
  declare label: string;
  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  declare image_url: string;

  // declare categories: string[];
  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
