import type { Request, Response } from 'express';

import { Topic as TopicModel } from '../db';

import type { Topic } from '../models/Topic';

export const TopicController = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  getTopics: async (request: Request, response: Response) => {
    try {
      const topics = await TopicModel.findAll();
      response.status(200).json({ data: topics });
    } catch (error) {
      response.status(400).json({ error: (error as Error).message });
    }
  },

  postTopic: async (request: Request, response: Response) => {
    try {
      const { userId, title } = request.body;
      const messageData: Omit<Topic, 'id'> = {
        userId,
        title,
      };
      await TopicModel.create(messageData);
      const topics = await TopicModel.findAll();
      response.status(200).json({ data: topics });
    } catch (error) {
      response.status(500).json({ reason: (error as Error).message });
    }
  },

  deleteTopic: async (request: Request, response: Response) => {
    try {
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
    } catch (error) {
      response.status(400).json({ error: (error as Error).message });
    }
  },
};
