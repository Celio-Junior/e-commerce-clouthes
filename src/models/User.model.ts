import { SequelizeInit } from '@/database';
import { UserCreateAttributes, UserModel } from '@/interfaces/UserModel.interface';

import { Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@SequelizeInit
@Table({
  timestamps: true,
  tableName: 'users',
  modelName: 'User',
  underscored: true,
})
export default class User extends Model<UserModel, UserCreateAttributes> {
  @PrimaryKey
  @Column({
    allowNull: false,
    type: DataType.UUIDV4,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING(11),
    allowNull: true,
  })
  declare phone: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare password: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
