import { Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'sizes', modelName: 'Size', timestamps: true, underscored: true })
export default class Size extends Model {
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
}
