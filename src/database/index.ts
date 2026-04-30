import { Sequelize } from 'sequelize-typescript';
import { configDb } from '../config/db';
import User from '@/models/User';
import Billboard from '@/models/Billboards';
import ImageBillboard from '@/models/ImageBillboard';

export const sequelize = new Sequelize(configDb);
sequelize.addModels([User, Billboard, ImageBillboard]);

export async function initDB() {
  await sequelize.sync();
}
// const registerModels = new Set<ModelCtor>();

// export function SequelizeInit<T extends ModelCtor>(classTest: T) {
//   if (!registerModels.has(classTest)) {
//     sequelize.addModels([classTest]);
//     registerModels.add(classTest);
//   }

//   sequelize.sync({ alter: true });
// }
