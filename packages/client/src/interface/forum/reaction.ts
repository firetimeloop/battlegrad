import { z } from 'zod';
import { IErrorResponse } from '../index';

export enum ReactionEnum {
  Like = 'like',
}

const ReactionModel = z.object({
  id: z.number(),
  userId: z.number(),
  userDisplayName: z.string(),
  userAvatar: z.string(),
  type: z.nativeEnum(ReactionEnum),
  topicId: z.number(),
  commentId: z.number().nullable(),
});

export const ReactionArrayModel = z.array(ReactionModel);

export type Reaction = z.infer<typeof ReactionModel>

export type GetReactionsResult = {
  data: Reaction[]
} | IErrorResponse

export type CreateReactionProps = Omit<Reaction, 'id'>

export type ReactionId = number
