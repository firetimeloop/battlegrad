import { IErrorResponse } from './Login';

export * from './Login';
export * from './Loader';

export interface IKeyStringObject {
  [key: string]: string
}

export interface IThunkApi {
  rejectValue?: IErrorResponse
  signal: AbortSignal
}
