import { Sequelize } from 'sequelize-typescript';
import { configDb } from '../config/db';
import User from '@/models/User';
import Product from '@/models/Product';
import Category from '@/models/Category';
import Billboard from '@/models/Billboard';
import ImageBillboard from '@/models/ImageBillboard';
import Size from '@/models/Size.model';
import Color from '@/models/Color.model';

export const sequelize = new Sequelize(configDb);
sequelize.addModels([User, Billboard, Category, ImageBillboard, Size, Color, Product]);

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
