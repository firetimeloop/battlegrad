import { z } from 'zod';
import { IErrorResponse } from '../index';

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
  data: ForumComment[]
} | IErrorResponse

export type CreateCommentProps = Omit<ForumComment, 'id'>
