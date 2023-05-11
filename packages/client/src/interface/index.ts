import { IErrorResponse } from './Login';

export * from './Login';
export * from './Loader';

export interface IThunkApi {
  rejectValue?: IErrorResponse
  signal: AbortSignal
}
