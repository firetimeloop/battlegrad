import {
  createAsyncThunk, createSlice, isAnyOf, PayloadAction,
} from '@reduxjs/toolkit';
import {
  IGetMeResponse, ILoginProps, ILoginResponse, IThunkApi, IUser, UserModel,
} from '../../interface';
import { getMe, login } from '../../api/login';

export const LogIn = createAsyncThunk<ILoginResponse, ILoginProps, IThunkApi>(
  'LogIn',
  (data, thunkApi) => login(data, thunkApi)
    .then((resolve) => resolve),
);

export const GetMe = createAsyncThunk<IGetMeResponse, void, IThunkApi>(
  'GetMe',
  (data, thunkApi) => getMe(thunkApi)
    .then((resolve) => resolve),
);

interface IAuthState {
  isFetching: boolean
  needFetchUser: boolean
  user: IUser | null
}

const AuthStateInit: IAuthState = {
  isFetching: false,
  needFetchUser: true,
  user: null,
};

export const slice = createSlice({
  name: 'auth',
  initialState: AuthStateInit,
  reducers: {
    setIsFetching(state, action: PayloadAction<boolean>) {
      state.isFetching = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetMe.fulfilled, (state, action) => {
      state.user = UserModel.parse(action.payload);
      state.needFetchUser = false;
    });
    builder.addCase(GetMe.rejected, (state) => {
      state.user = null;
      state.needFetchUser = false;
    });
    builder.addCase(LogIn.fulfilled, (state) => {
      state.needFetchUser = true;
    });

    builder.addMatcher(isAnyOf(
      LogIn.pending,
      GetMe.pending,
    ), (state) => {
      state.isFetching = true;
    });
    builder.addMatcher(isAnyOf(
      LogIn.fulfilled,
      GetMe.fulfilled,
    ), (state) => {
      state.isFetching = false;
    });
    builder.addMatcher(isAnyOf(
      LogIn.rejected,
      GetMe.rejected,
    ), (state, action) => {
      // если пошел новый запрос а старый отменили, лоадер не убираем
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
