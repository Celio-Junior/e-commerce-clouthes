import { Dialect } from 'sequelize';
import { SequelizeOptions } from 'sequelize-typescript';
import { resolve } from 'node:path';
import envVar from 'env-var';
export const configDb: SequelizeOptions = {
  dialect: envVar.get('DB_DIALECT').default('sqlite').asString() as Dialect,
  storage: resolve(process.cwd(), 'src', 'database', envVar.get('DB_PATH').default('db.sqlite').asString()),
  // logging: false,
};
