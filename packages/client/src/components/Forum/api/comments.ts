import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateCommentProps, GetCommentsResult } from '../../../interface/forum/comment';
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

export const CreateComment = createAsyncThunk<GetCommentsResult, CreateCommentProps, IThunkApi>(
  'CreateComment',
  async (data, { signal }) => {
    const response = await axiosServerApi.post<GetCommentsResult>('/api/forum/comments', data, {
      signal,
    });
    return response.data;
  },
);
