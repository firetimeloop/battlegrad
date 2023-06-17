import type { RootState } from './store';

export function selectGameState(state: RootState) {
  return state.game;
}

export function selectLeaderboardState(state: RootState) {
  return state.leaderboard;
}
