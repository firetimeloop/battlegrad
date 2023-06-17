import type { RootState } from './store';

export function selectAuthState(state: RootState) {
  return state.auth;
}
