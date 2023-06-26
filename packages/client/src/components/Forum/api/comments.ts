import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  CreateCommentProps,
  CreateCommentResult,
  GetCommentsResult,
} from '../../../interface/forum/comment';
import { IThunkApi } from '../../../interface';
import { axiosServerApi } from '../../../app/api';
import { TopicId } from '../../../interface/forum/topic';

export const GetComments = createAsyncThunk<GetCommentsResult, TopicId, IThunkApi>(
  'GetComments',
  async (topicId, { signal }) => {
    const response = await axiosServerApi.get<GetCommentsResult>(`/api/forum/comments/${topicId}`, {
      signal,
    });
    return response.data;
  },
);

export const CreateComment = createAsyncThunk<CreateCommentResult, CreateCommentProps, IThunkApi>(
  'CreateComment',
  async (data, { signal }) => {
    const response = await axiosServerApi.post<CreateCommentResult>('/api/forum/comments', data, {
      signal,
    });
    return response.data;
  },
);
