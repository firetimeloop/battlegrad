import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { CreateTopic, DeleteTopic, GetTopics } from '@components/Forum/api/topics';
import { CreateComment, GetComments } from '@components/Forum/api/comments';
import { CreateReaction, DeleteReaction, GetReactions } from '@components/Forum/api/reactions';
import { Topic, TopicArrayModel } from '../../interface/forum/topic';
import { CommentArrayModel, ForumComment } from '../../interface/forum/comment';
import { Reaction, ReactionArrayModel } from '../../interface/forum/reaction';

type ApiLoaders = Record<string, boolean>

interface IForumState {
  topics: Topic[]
  comments: ForumComment[]
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
    builder.addCase(GetComments.fulfilled, (state, action) => {
      state.comments = CommentArrayModel.parse(action.payload.data.comments);
    });
    builder.addCase(CreateComment.fulfilled, (state, action) => {
      state.comments = CommentArrayModel.parse(action.payload.data);
    });
    builder.addMatcher(isAnyOf(
      GetTopics.fulfilled,
      CreateTopic.fulfilled,
      DeleteTopic.fulfilled,
    ), (state, action) => {
      state.topics = TopicArrayModel.parse(action.payload.data);
    });
    builder.addMatcher(isAnyOf(
      GetReactions.fulfilled,
      CreateReaction.fulfilled,
      DeleteReaction.fulfilled,
    ), (state, action) => {
      state.reactions = ReactionArrayModel.parse(action.payload.data);
    });
    builder.addMatcher(isAnyOf(
      GetTopics.pending,
      CreateTopic.pending,
      DeleteTopic.pending,

      GetComments.pending,
      CreateComment.pending,

      GetReactions.pending,
      CreateReaction.pending,
      DeleteReaction.pending,
    ), (state, action) => {
      state.loaders[action.type.split('/')[0]] = true;
    });
    builder.addMatcher(isAnyOf(
      GetTopics.fulfilled,
      CreateTopic.fulfilled,
      DeleteTopic.fulfilled,

      GetComments.fulfilled,
      CreateComment.fulfilled,

      GetReactions.fulfilled,
      CreateReaction.fulfilled,
      DeleteReaction.fulfilled,
    ), (state, action) => {
      delete state.loaders[action.type.split('/')[0]];
    });
    builder.addMatcher(isAnyOf(
      GetTopics.rejected,
      CreateTopic.rejected,
      DeleteTopic.rejected,

      GetComments.rejected,
      CreateComment.rejected,

      GetReactions.rejected,
      CreateReaction.rejected,
      DeleteReaction.rejected,
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
