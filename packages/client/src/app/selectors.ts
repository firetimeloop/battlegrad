import type { RootState } from './store';

export function selectGameState(state: RootState) {
  return state.game;
}

export function selectLeaderboardState(state: RootState) {
  return state.leaderboard;
}

export function selectAuthState(state: RootState) {
  return state.auth;
}

export function selectForumState(state: RootState) {
  return state.forum;
}
