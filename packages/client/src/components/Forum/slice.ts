import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { IThunkApi } from '../../interface';
import { axiosYandexApi } from '../../app/api';
import { Comment, IGetTopicsResult, Topic, TopicArrayModel } from '../../interface/Forum';

export const GetTopics = createAsyncThunk<IGetTopicsResult, void, IThunkApi>(
  'GetTopics',
  async (data, { signal }) => {
    const response = await axiosYandexApi.get<IGetTopicsResult>('/forum/topics', {
      signal,
    });
    return response.data;
  },
);

interface IForumState {
  topics: Topic[]
  comments: Comment[]
  isFetching: boolean
}

const ForumStateInit: IForumState = {
  topics: [],
  comments: [],
  isFetching: false,
};

export const slice = createSlice({
  name: 'forum',
  initialState: ForumStateInit,
  reducers: {
    setIsFetching(state, action: PayloadAction<boolean>) {
      state.isFetching = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetTopics.fulfilled, (state, action) => {
      state.topics = TopicArrayModel.parse(action.payload);
    });
    builder.addCase(GetTopics.pending, (state) => {
      state.topics = [];
    });

    builder.addMatcher(isAnyOf(
      GetTopics.pending,
    ), (state) => {
      state.isFetching = true;
    });
    builder.addMatcher(isAnyOf(
      GetTopics.fulfilled,
    ), (state) => {
      state.isFetching = false;
    });
    builder.addMatcher(isAnyOf(
      GetTopics.rejected,
    ), (state, action) => {
      // если пошел новый запрос, а старый отменили, лоадер не убираем
      if (action.error.message !== 'Aborted') {
        state.isFetching = false;
      }
    });
  },
});

export const {
  setIsFetching,
} = slice.actions;

export default slice.reducer;
