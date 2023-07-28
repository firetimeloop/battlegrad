import type { ModelAttributes } from 'sequelize';
import { Model, DataType } from 'sequelize-typescript';

export type Theme = {
  id: number;
  userId: number;
  theme: string;
};

export const themeModel: ModelAttributes<Model, Theme> = {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  theme: {
    type: DataType.STRING,
    allowNull: false,
  },
};
