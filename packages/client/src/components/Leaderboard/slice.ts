import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { resetGame } from '@components/Game/slice';
import { IThunkApi, UserModel } from '../../interface';
import { axiosYandexApi } from '../../app/api';
import {
  TLeaderData,
  TAddLeaderRequest,
  TAddLeaderResponse,
  TGetLeadersRequest,
  TGetLeadersResponse,
  TGetLeadersValidResponse,
} from '../../interface/Leaderboard';
import { RootState } from '../../app/store';

const TEAM_NAME = 'testMuske';
const RATING_FIELD_NAME = 'winsNumber';
const LIMIT = 10;
const MAX_LIMIT = 1000;

function isValidLeadersResponse(
  response: TGetLeadersResponse,
): response is TGetLeadersValidResponse {
  const isArray = Array.isArray(response);

  return isArray;
}

export const GetCurrentUserWinsNumber = createAsyncThunk<
  number,
  void,
  IThunkApi
>(
  'leaderboard/getCurrentUserWinsNumber',
  async (data, { signal, getState }) => {
    let winsNumber = 0;

    const payload: TGetLeadersRequest = {
      cursor: 0,
      limit: MAX_LIMIT,
      ratingFieldName: RATING_FIELD_NAME,
    };

    const { data: responseData } =
      await axiosYandexApi.post<TGetLeadersResponse>(
        `/leaderboard/${TEAM_NAME}`,
        payload,
        {
          signal,
        },
      );

    if (isValidLeadersResponse(responseData)) {
      const leaders = responseData.map((item) => item.data);

      const currentUser = UserModel.parse((getState() as RootState).auth.user);

      winsNumber =
        leaders.find((leader) => leader.email === currentUser.email)
          ?.winsNumber ?? 0;
    }

    return winsNumber;
  },
);

export const addLeader = createAsyncThunk<TAddLeaderResponse, void, IThunkApi>(
  'leaderboard/add',
  async (data, { signal, getState }) => {
    const { currentUserWinsNumber } = (getState() as RootState).leaderboard;

    const currentUser = UserModel.parse((getState() as RootState).auth.user);

    const leaderData: TLeaderData = {
      avatar: currentUser.avatar ?? '',
      email: currentUser.email,
      name: `${currentUser.first_name} ${currentUser.second_name}`,
      winsNumber: currentUserWinsNumber + 1,
    };

    const payload: TAddLeaderRequest = {
      data: leaderData,
      ratingFieldName: RATING_FIELD_NAME,
      teamName: TEAM_NAME,
    };

    const response = await axiosYandexApi.post<TAddLeaderResponse>(
      '/leaderboard',
      payload,
      {
        signal,
      },
    );
    return response.data;
  },
);

export const GetLeadersAll = createAsyncThunk<
  TGetLeadersResponse,
  void,
  IThunkApi
>('leaderboard/fetchAll', async (data, { signal }) => {
  const payload: TGetLeadersRequest = {
    cursor: 0,
    limit: LIMIT,
    ratingFieldName: RATING_FIELD_NAME,
  };

  const response = await axiosYandexApi.post<TGetLeadersResponse>(
    '/leaderboard/all',
    payload,
    {
      signal,
    },
  );

  return response.data;
});

export const GetLeadersByTeamName = createAsyncThunk<
  TGetLeadersResponse,
  void,
  IThunkApi
>('leaderboard/fetchByTeamName', async (data, { signal }) => {
  const payload: TGetLeadersRequest = {
    cursor: 0,
    limit: LIMIT,
    ratingFieldName: RATING_FIELD_NAME,
  };

  const response = await axiosYandexApi.post<TGetLeadersResponse>(
    `/leaderboard/${TEAM_NAME}`,
    payload,
    {
      signal,
    },
  );

  return response.data;
});

type TLeaderboardState = {
  leaders: Array<TLeaderData>;
  isFetching: boolean;
  currentUserWinsNumber: number;
  isSendLeaderAvailable: boolean;
};

const LeaderboardStateInit: TLeaderboardState = {
  leaders: [],
  isFetching: false,
  currentUserWinsNumber: 0,
  isSendLeaderAvailable: true,
};

export const slice = createSlice({
  name: 'leaderboard',
  initialState: LeaderboardStateInit,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetCurrentUserWinsNumber.fulfilled, (state, action) => {
      state.currentUserWinsNumber = action.payload;
    });
    builder.addCase(addLeader.pending, (state) => {
      state.isSendLeaderAvailable = false;
    });
    builder.addCase(addLeader.fulfilled, (state) => {
      state.currentUserWinsNumber += 1;
    });
    builder.addCase(resetGame.type, (state) => {
      state.isSendLeaderAvailable = true;
    });
    builder.addMatcher(
      isAnyOf(GetLeadersAll.pending, GetLeadersByTeamName.pending),
      (state) => {
        state.isFetching = true;
      },
    );
    builder.addMatcher(
      isAnyOf(GetLeadersAll.fulfilled, GetLeadersByTeamName.fulfilled),
      (state, action) => {
        state.isFetching = false;

        const { payload } = action;

        if (isValidLeadersResponse(payload)) {
          const leaders = payload.map((item) => item.data);

          state.leaders = leaders;
        }
      },
    );
  },
});

export default slice.reducer;
