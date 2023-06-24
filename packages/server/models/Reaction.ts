import type { ModelAttributes } from 'sequelize';
import { Model, DataType } from 'sequelize-typescript';

export enum ReactionEnum {
  Like = 'like',
}

export type Reaction = {
  id: number;
  userId: number;
  userDisplayName: string;
  userAvatar: string;
  type: ReactionEnum;
  topicId: number;
  commentId: number;
};

export const reactionModel: ModelAttributes<Model, Reaction> = {
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
  type: {
    type: DataType.STRING,
    allowNull: false,
  },
  commentId: {
    type: DataType.INTEGER,
    allowNull: true,
  },
  topicId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
};
