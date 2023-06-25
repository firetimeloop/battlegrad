import { z } from 'zod';
import { IUser } from '../index';
import { Reaction } from './reaction';

const CommentModel = z.object({
  id: z.number(),
  userId: z.number(),
  userDisplayName: z.string(),
  userAvatar: z.string(),
  content: z.string(),
  topicId: z.number(),
  parentCommentId: z.number().nullable(),
});

export const CommentArrayModel = z.array(CommentModel);

export type ForumComment = z.infer<typeof CommentModel>

export type GetCommentsResult = {
  data: { comments: ForumComment[], reactions: Reaction[] }
}

export type CreateCommentProps = {
  user: IUser
  content: string
  topicId: number
  parentCommentId: number | null
}
