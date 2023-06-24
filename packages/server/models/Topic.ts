import type { ModelAttributes } from 'sequelize';
import { Model, DataType } from 'sequelize-typescript';

export type Topic = {
  id: number;
  userId: number;
  title: string;
};

export const topicModel: ModelAttributes<Model, Topic> = {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataType.STRING,
    allowNull: false,
  },
};
