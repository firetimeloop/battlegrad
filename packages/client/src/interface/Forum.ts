import { z } from 'zod';

const TopicModel = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
});

export const TopicArrayModel = z.array(TopicModel);

export type Topic = z.infer<typeof TopicModel>

export interface IGetTopicsResult {
  data: Topic[]
}

const CommentModel = z.object({
  id: z.number(),
  userId: z.number(),
  userDisplayName: z.string(),
  userAvatar: z.string(),
  content: z.string(),
  topicId: z.string(),
  parentCommentId: z.string(),
});

export type Comment = z.infer<typeof CommentModel>
