import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  CreateReactionProps,
  GetReactionsResult,
  ReactionId,
} from '../../../interface/forum/reaction';
import { IThunkApi } from '../../../interface';
import { axiosServerApi } from '../../../app/api';
import { TopicId } from '../../../interface/forum/topic';

export const GetReactions = createAsyncThunk<GetReactionsResult, TopicId, IThunkApi>(
  'GetReactions',
  async (topicId, { signal }) => {
    const response = await axiosServerApi.get<GetReactionsResult>(
      `/api/forum/reactions/${topicId}`,
      { signal });
    return response.data;
  },
);

export const CreateReaction = createAsyncThunk<GetReactionsResult, CreateReactionProps, IThunkApi>(
  'CreateReaction',
  async (data, { signal }) => {
    const response = await axiosServerApi.post<GetReactionsResult>('/api/forum/reactions', data, {
      signal,
    });
    return response.data;
  },
);

export const DeleteReaction = createAsyncThunk<GetReactionsResult, ReactionId, IThunkApi>(
  'DeleteReaction',
  async (id, { signal }) => {
    const response = await axiosServerApi.delete<GetReactionsResult>(`/api/forum/reactions/${id}`, {
      signal,
    });
    return response.data;
  },
);
