import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import {
  IGetMeResponse,
  ILoginProps,
  ILoginResponse,
  IThunkApi,
  IUser,
  UserModel,
} from '../../interface';
import { axiosYandexApi } from '../../app/api';
import { IRegisterProps, IRegisterResponse } from '../../interface/Register';
import {
  IChangePasswordProps,
  IProfileChange,
  IProfileUpdateResult,
  IUpdatePasswordResult,
} from '../../interface/Profile';

export const LogIn = createAsyncThunk<ILoginResponse, ILoginProps, IThunkApi>(
  'LogIn',
  async (data, { signal }) => {
    const response = await axiosYandexApi.post<ILoginResponse>('/auth/signin', data, {
      signal,
    });
    return response.data;
  },
);

export const CreateUser = createAsyncThunk<IRegisterResponse, IRegisterProps, IThunkApi>(
  'CreateUser',
  async (data, { signal }) => {
    const response = await axiosYandexApi.post<IRegisterResponse>('/auth/signup', data, {
      signal,
    });
    return response.data;
  },
);
export const LogOut = createAsyncThunk<ILoginResponse, undefined, IThunkApi>(
  'LogOut',
  async (data, { signal }) => {
    const response = await axiosYandexApi.post<ILoginResponse>('/auth/logout', data, {
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

export const UpdateProfile = createAsyncThunk<IProfileUpdateResult, IProfileChange, IThunkApi>(
  'UpdateProfile',
  async (data, { signal }) => {
    const response = await axiosYandexApi.put<IProfileUpdateResult>('/user/profile', data, {
      signal,
    });
    return response.data;
  },
);

export const UpdateAvatar = createAsyncThunk<IProfileUpdateResult, FormData, IThunkApi>(
  'UpdateAvatar',
  async (data, { signal }) => {
    const response = await axiosYandexApi.put<IProfileUpdateResult>('/user/profile/avatar', data, {
      signal,
    });
    return response.data;
  },
);
export const UpdatePassword =
  createAsyncThunk<IUpdatePasswordResult, IChangePasswordProps, IThunkApi>(
    'UpdatePassword',
    async (data, { signal }) => {
      const response = await axiosYandexApi.put<IUpdatePasswordResult>('/user/password', data, {
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
    builder.addCase(LogOut.fulfilled, (state) => {
      state.user = null;
    });
    builder.addMatcher(isAnyOf(
      LogIn.fulfilled,
      CreateUser.fulfilled,
      UpdateProfile.fulfilled,
      UpdateAvatar.fulfilled,
      UpdatePassword.fulfilled,
    ), (state) => {
      state.needFetchUser = true;
    });
    builder.addMatcher(isAnyOf(
      LogIn.pending,
      GetMe.pending,
      CreateUser.pending,
    ), (state) => {
      state.isFetching = true;
    });
    builder.addMatcher(isAnyOf(
      LogIn.fulfilled,
      GetMe.fulfilled,
      CreateUser.fulfilled,
    ), (state) => {
      state.isFetching = false;
    });
    builder.addMatcher(isAnyOf(
      LogIn.rejected,
      GetMe.rejected,
      CreateUser.rejected,
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
