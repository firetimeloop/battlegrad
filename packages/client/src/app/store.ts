import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '@components/Auth/slice';
import alertReducer from '@components/Alert/slice';
import gameReducer from '@components/Game/slice';
import leaderboardReducer from '@components/Leaderboard/slice';
import forumReducer from '@components/Forum/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    game: gameReducer,
    leaderboard: leaderboardReducer,
    forum: forumReducer,
  },
  preloadedState: {},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
