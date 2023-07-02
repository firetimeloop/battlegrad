import type { Request, Response } from 'express';

import { tryCatch } from '../helpers/controllerHelper';

import { Comment as CommentModel, Reaction as ReactionModel } from '../db';

import type { Comment } from '../models/Comment';

export const CommentController = {
  getCommentsByTopicId: async (request: Request, response: Response) => {
    tryCatch(response, async () => {
      const topicId = +request.params.topic_id;
      const comments = await CommentModel.findAll({ where: { topicId } });
      const reactions = await ReactionModel.findAll({
        where: { topicId },
      });
      response.status(200).json({ data: { comments, reactions } });
    });
  },

  postComment: async (request: Request, response: Response) => {
    tryCatch(response, async () => {
      const { id, avatar, display_name } = request.body.user;
      const messageData: Omit<Comment, 'id'> = {
        userAvatar: avatar,
        userId: id,
        userDisplayName: display_name,
        content: request.body.content,
        parentCommentId: request.body.parentCommentId,
        topicId: +request.body.topicId,
      };
      await CommentModel.create({ ...messageData });
      const topicId = +request.body.topicId;
      const topics = await CommentModel.findAll({ where: { topicId } });
      response.status(200).json({ data: topics });
    });
  },
};
