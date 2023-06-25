import type { Request, Response } from 'express';

import { tryCatch } from '../helpers/controllerHelper';

import { Topic as TopicModel } from '../db';

import type { Topic } from '../models/Topic';

export const TopicController = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  getTopics: async (request: Request, response: Response) => {
    tryCatch(response, async () => {
      const topics = await TopicModel.findAll();
      response.status(200).json({ data: topics });
    });
  },

  postTopic: async (request: Request, response: Response) => {
    tryCatch(response, async () => {
      const { userId, title } = request.body;
      const messageData: Omit<Topic, 'id'> = {
        userId,
        title,
      };
      await TopicModel.create(messageData);
      const topics = await TopicModel.findAll();
      response.status(200).json({ data: topics });
    });
  },

  deleteTopic: async (request: Request, response: Response) => {
    tryCatch(response, async () => {
      const topicId = +request.params.topic_id;
      const topic = await TopicModel.findByPk(topicId);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (topic) {
        await topic.destroy();
        const topics = await TopicModel.findAll();
        response.status(200).json({ data: topics });
      } else {
        response.status(400).json({ error: 'Топик не найден!' });
      }
    });
  },
};
