import {
  createAsyncThunk, createSlice, isAnyOf, PayloadAction,
} from '@reduxjs/toolkit';
import {
  IGetMeResponse, ILoginProps, ILoginResponse, IThunkApi, IUser, UserModel,
} from '../../interface';
import { axiosYandexApi } from '../../app/api';

export const LogIn = createAsyncThunk<ILoginResponse, ILoginProps, IThunkApi>(
  'LogIn',
  async (data, { signal }) => {
    const response = await axiosYandexApi.post<ILoginResponse>('/auth/signin', data, {
      signal,
    });
    return response.data;
  },
);

export const GetMe = createAsyncThunk<IGetMeResponse, void, IThunkApi>(
  'GetMe',
  async (data, { signal }) => {
    const response = await axiosYandexApi.get<IGetMeResponse>('/auth/user', {
      signal,
    });
    return response.data;
  },
);

interface IAuthState {
  isFetching: boolean
  user: IUser | null
  needFetchUser: boolean
}

const AuthStateInit: IAuthState = {
  isFetching: false,
  user: null,
  needFetchUser: true,
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
      state.needFetchUser = false;
      state.user = UserModel.parse(action.payload);
    });
    builder.addCase(GetMe.rejected, (state) => {
      state.needFetchUser = false;
      state.user = null;
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
