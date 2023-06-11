import {
  createAsyncThunk, createSlice, isAnyOf, PayloadAction,
} from '@reduxjs/toolkit';
import {
  IGetMeResponse,
  IGetServiceIdProps,
  IGetServiceIdResponse,
  ILoginProps,
  ILoginResponse,
  IOauthProps,
  IThunkApi,
  IUser,
  UserModel,
} from '../../interface';
import { axiosYandexApi } from '../../app/api';
import { IRegisterProps, IRegisterResponse } from '../../interface/Register';

export const LogIn = createAsyncThunk<ILoginResponse, ILoginProps, IThunkApi>(
  'LogIn',
  async (data, { signal }) => {
    const response = await axiosYandexApi.post<ILoginResponse>('/auth/signin', data, {
      signal,
    });
    return response.data;
  },
);

export const GetOauthServiceId = createAsyncThunk<IGetServiceIdResponse, IGetServiceIdProps>(
  'GetOauthServiceId',
  async ({ redirectUri }) => {
    const response = await axiosYandexApi
      .get<IGetServiceIdResponse>(`/oauth/yandex/service-id?redirect_uri=${redirectUri}`);
    return response.data;
  },
);

export const OauthLogin = createAsyncThunk<ILoginResponse, IOauthProps>(
  'OauthLogin',
  async (data) => {
    const response = await axiosYandexApi.post<ILoginResponse>('/oauth/yandex', data);
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

interface IAuthState {
  isFetching: boolean
  user: IUser | null
  needFetchUser: boolean
  service_id: string | null
}

const AuthStateInit: IAuthState = {
  isFetching: false,
  user: null,
  needFetchUser: true,
  service_id: null,
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
    builder.addCase(GetOauthServiceId.fulfilled, (state, action) => {
      if (action.payload.service_id) {
        state.service_id = action.payload.service_id;
      }
    });
    builder.addMatcher(isAnyOf(
      LogIn.fulfilled,
      CreateUser.fulfilled,
      OauthLogin.fulfilled,
    ), (state) => {
      state.needFetchUser = true;
      if (state.service_id) {
        state.service_id = null;
      }
    });
    builder.addMatcher(isAnyOf(
      LogIn.pending,
      GetMe.pending,
      CreateUser.pending,
      GetOauthServiceId.pending,
    ), (state) => {
      state.isFetching = true;
    });
    builder.addMatcher(isAnyOf(
      LogIn.fulfilled,
      GetMe.fulfilled,
      CreateUser.fulfilled,
      GetOauthServiceId.fulfilled,
    ), (state) => {
      state.isFetching = false;
    });
    builder.addMatcher(isAnyOf(
      LogIn.rejected,
      GetMe.rejected,
      CreateUser.rejected,
      GetOauthServiceId.rejected,
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
