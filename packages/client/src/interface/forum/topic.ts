import { z } from 'zod';

const TopicModel = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
});

export const TopicArrayModel = z.array(TopicModel);

export type Topic = z.infer<typeof TopicModel>

export type GetTopicsResult = {
  data: Topic[]
}

export type CreateTopicProps = Omit<Topic, 'id'>

export type TopicId = number
