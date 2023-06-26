import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateTopicProps, GetTopicsResult, TopicId } from '../../../interface/forum/topic';
import { IThunkApi } from '../../../interface';
import { axiosServerApi } from '../../../app/api';

export enum TopicThunks {
  Get = 'GetTopics',
  Create = 'CreateTopic',
  Delete = 'DeleteTopic',
}

export const GetTopics = createAsyncThunk<GetTopicsResult, void, IThunkApi>(
  TopicThunks.Get,
  async (arg, { signal }) => {
    const response = await axiosServerApi.get<GetTopicsResult>('/api/forum/topics', {
      signal,
    });
    return response.data;
  },
);

export const CreateTopic = createAsyncThunk<GetTopicsResult, CreateTopicProps, IThunkApi>(
  TopicThunks.Create,
  async (arg, { signal }) => {
    const response = await axiosServerApi.post<GetTopicsResult>('/api/forum/topics', arg, {
      signal,
    });
    return response.data;
  },
);

export const DeleteTopic = createAsyncThunk<GetTopicsResult, TopicId, IThunkApi>(
  TopicThunks.Delete,
  async (id, { signal }) => {
    const response = await axiosServerApi.delete<GetTopicsResult>(`/api/forum/topics/${id}`, {
      signal,
    });
    return response.data;
  },
);
