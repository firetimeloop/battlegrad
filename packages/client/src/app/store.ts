import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '@components/Auth/slice';
import alertReducer from '@components/Alert/slice';
import gameReducer from '@components/Game/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    game: gameReducer,
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
