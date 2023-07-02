import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateThemeProps, GetThemeResult } from '../../../interface/theme/theme';
import { IThunkApi } from '../../../interface';
import { axiosServerApi } from '../../../app/api';
import { darkTheme, lightTheme } from '../../../theme';

export enum ThemeThunks {
  Get = 'GetTheme',
  Create = 'CreateTheme',
}

export const setThemeByTitle = (title: string, setSelectedTheme: any): void => {
  switch (title) {
    case 'darkTheme':
      setSelectedTheme(darkTheme);
      break;
    case 'lightTheme':
      setSelectedTheme(lightTheme);
      break;
    default:
      setSelectedTheme(darkTheme);
  }
};

export const GetTheme = createAsyncThunk<
  GetThemeResult,
  { userId: number; setSelectedTheme: any },
  IThunkApi
>(ThemeThunks.Get, async ({ userId, setSelectedTheme }, { signal }) => {
  const response = await axiosServerApi.get<GetThemeResult>(
    `/api/theme/get/${userId}`,
    {
      signal,
    },
  );
  const { theme } = response.data.data;

  setThemeByTitle(theme, setSelectedTheme);

  return response.data;
});

export const CreateTheme = createAsyncThunk<
  GetThemeResult,
  CreateThemeProps,
  IThunkApi
>(ThemeThunks.Create, async (arg, { signal }) => {
  const response = await axiosServerApi.post<GetThemeResult>(
    '/api/theme/create',
    arg,
    {
      signal,
    },
  );
  return response.data;
});
