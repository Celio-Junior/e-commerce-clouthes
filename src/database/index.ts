import { ModelCtor, Sequelize } from 'sequelize-typescript';
import { configDb } from '../config/db.config';

export const sequelize = new Sequelize(configDb);
// sequelize.addModels([User]);

const registerModels = new Set<ModelCtor>();

export function SequelizeInit<T extends ModelCtor>(classTest: T) {
  if (!registerModels.has(classTest)) {
    sequelize.addModels([classTest]);
    registerModels.add(classTest);
  }
}
await sequelize.sync({ alter: true });
