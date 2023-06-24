import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { CreateTopic, DeleteTopic, GetTopics } from '@components/Forum/api/topics';
import { Topic, TopicArrayModel } from '../../interface/forum/topic';
import { ForumComment } from '../../interface/forum/comment';
import { Reaction } from '../../interface/forum/reaction';

type INestedComment = ForumComment & {
  related: ForumComment[]
}

type ApiLoaders = Record<string, boolean>

interface IForumState {
  topics: Topic[]
  comments: INestedComment[]
  reactions: Reaction[]
  loaders: ApiLoaders
  selectedTopic: Topic | null
}

const ForumStateInit: IForumState = {
  topics: [],
  comments: [],
  reactions: [],
  loaders: {},
  selectedTopic: null,
};

export const slice = createSlice({
  name: 'forum',
  initialState: ForumStateInit,
  reducers: {
    setSelectedTopic(state, action: PayloadAction<Topic | null>) {
      state.selectedTopic = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(
      GetTopics.pending,
      CreateTopic.pending,
      DeleteTopic.pending,
    ), (state, action) => {
      console.log(action);
      state.loaders[action.type.split('/')[0]] = true;
    });
    builder.addMatcher(isAnyOf(
      GetTopics.fulfilled,
      CreateTopic.fulfilled,
      DeleteTopic.fulfilled,
    ), (state, action) => {
      state.topics = TopicArrayModel.parse(action.payload.data);
      delete state.loaders[action.type.split('/')[0]];
    });
    builder.addMatcher(isAnyOf(
      GetTopics.rejected,
      CreateTopic.rejected,
      DeleteTopic.rejected,
    ), (state, action) => {
      if (!action.meta.aborted) {
        delete state.loaders[action.type.split('/')[0]];
      }
    });
  },
});

export const {
  setSelectedTopic,
} = slice.actions;

export default slice.reducer;
