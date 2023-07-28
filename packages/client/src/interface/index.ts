import { RootState } from '../app/store';

export * from './Login';
export * from './Loader';

export interface IErrorResponse {
  reason: string
}

export interface IThunkApi {
  rejectValue?: IErrorResponse
  signal: AbortSignal,
  getState: () => RootState,
}
