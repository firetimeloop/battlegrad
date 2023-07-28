import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { themeModel } from './models/Theme';
import { topicModel } from './models/Topic';
import { commentModel } from './models/Comment';
import { reactionModel } from './models/Reaction';

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env;

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres', // 'mysql', 'sqlite', 'mariadb', 'mssql'
};

const sequelize = new Sequelize(sequelizeOptions);

export const Topic = sequelize.define('Topic', topicModel, {
  updatedAt: false,
  createdAt: false,
});
export const Comment = sequelize.define('Comment', commentModel, {
  updatedAt: false,
  createdAt: false,
});
export const Reaction = sequelize.define('Reaction', reactionModel, {
  updatedAt: false,
  createdAt: false,
});
export const Theme = sequelize.define('Theme', themeModel, {
  updatedAt: false,
  createdAt: false,
});

Topic.hasMany(Comment, {
  foreignKey: 'topicId',
  onDelete: 'CASCADE',
});

Topic.hasMany(Reaction, {
  foreignKey: 'topicId',
  onDelete: 'CASCADE',
});

Comment.hasMany(Reaction, {
  foreignKey: 'commentId',
  onDelete: 'CASCADE',
});

export async function dbConnect() {
  try {
    await sequelize.authenticate(); // Проверка аутентификации в БД
    await sequelize.sync(); // Синхронизация базы данных
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
