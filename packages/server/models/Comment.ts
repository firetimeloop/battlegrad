import type { ModelAttributes } from 'sequelize';
import { Model, DataType } from 'sequelize-typescript';

export type Comment = {
  id: number;
  userId: number;
  userDisplayName: string;
  userAvatar: string;
  content: string;
  topicId: number;
  parentCommentId: number;
};

export const commentModel: ModelAttributes<Model, Comment> = {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  userDisplayName: {
    type: DataType.STRING,
    allowNull: false,
  },
  userAvatar: {
    type: DataType.STRING,
    allowNull: false,
  },
  content: {
    type: DataType.STRING,
    allowNull: false,
  },
  parentCommentId: {
    type: DataType.INTEGER,
    allowNull: true,
  },
  topicId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
};
