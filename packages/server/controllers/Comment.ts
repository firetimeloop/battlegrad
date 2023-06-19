import type { Request, Response } from 'express';

import { Comment as CommentModel, Reaction as ReactionModel } from '../db';

export const CommentController = {
  getCommentsByTopicId: async (request: Request, response: Response) => {
    try {
      const topicId = +request.params.topic_id;
      const comments = await CommentModel.findAll({ where: { topicId } });
      const reactions = await ReactionModel.findAll({
        where: { topicId },
      });
      response.status(200).json({ data: { comments, reactions } });
    } catch (error) {
      response.status(400).json({ error: (error as Error).message });
    }
  },

  postComment: async (request: Request, response: Response) => {
    try {
      const { id, avatar, display_name } = request.body.user;
      const messageData = {
        userAvatar: avatar,
        userId: id,
        userDisplayName: display_name,
        content: request.body.content,
        parentCommentId: +request.body.parentCommentId,
        topicId: +request.body.topicId,
      };
      await CommentModel.create({ ...messageData });
      const topicId = +request.body.topicId;
      const topics = await CommentModel.findAll({ where: { topicId } });
      response.status(200).json({ data: topics });
    } catch (error) {
      response.status(400).json({ error: (error as Error).message });
    }
  },
};
