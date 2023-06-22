import type { IErrorResponse } from './index';

export type TLeaderData = {
  name: string;
  email: string;
  avatar: string;
  winsNumber: number;
};

export type TAddLeaderRequest = {
  data: TLeaderData;
  ratingFieldName: string;
  teamName: string;
};

export type TAddLeaderResponse = IErrorResponse | null;

export type TGetLeadersRequest = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

export type TGetLeadersValidResponse = Array<{ data: TLeaderData }>;

export type TGetLeadersResponse = IErrorResponse | TGetLeadersValidResponse;
