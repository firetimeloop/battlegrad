import type { Request, Response } from 'express';

import { Reaction as ReactionModel } from '../db';

import type { Reaction } from '../models/Reaction';

export const ReactionController = {
  getReactionsByTopicId: async (request: Request, response: Response) => {
    try {
      const topicId = +request.params.topic_id;
      const reactions = await ReactionModel.findAll({
        where: { topicId },
      });
      response.status(200).json({ data: reactions });
    } catch (error) {
      response.status(400).json({ error: (error as Error).message });
    }
  },

  postReaction: async (request: Request, response: Response) => {
    try {
      const { id, avatar, display_name } = request.body.user;
      const messageData: Omit<Reaction, 'id'> = {
        commentId: +request.body.commentId,
        topicId: +request.body.topicId,
        type: request.body.type,
        userAvatar: avatar,
        userDisplayName: display_name,
        userId: id,
      };
      await ReactionModel.create(messageData);
      const topicId = +request.body.topicId;
      const reactions = await ReactionModel.findAll({ where: { topicId } });
      response.status(200).json({ data: reactions });
    } catch (error) {
      response.status(400).json({ error: (error as Error).message });
    }
  },

  deleteReaction: async (request: Request, response: Response) => {
    try {
      const reactionId = +request.params.reaction_id;
      const reaction = await ReactionModel.findByPk(reactionId);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { topicId } = reaction;
      if (reaction) {
        await reaction.destroy();
        const reactions = await ReactionModel.findAll({
          where: { topicId },
        });
        response.status(200).json({ data: reactions });
      } else {
        response.status(400).json({ error: 'Реакция не найдена!' });
      }
    } catch (error) {
      response.status(400).json({ error: (error as Error).message });
    }
  },
};
