import { z } from 'zod';
import { IUser } from '../index';

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
}

export type CreateReactionProps = {
  user: IUser
  type: ReactionEnum
  topicId: number
  commentId: number | null
}

export type ReactionId = number
