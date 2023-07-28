import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum GameStatus {
  showControls,
  normal,
  gameOver,
  win,
}

export enum PlayersMode {
  single,
  multiplayer
}

interface IGameState {
  player: {
    healthCount: number
  }
  enemiesDefeated: number
  status: GameStatus
  playersMode: PlayersMode | null
}

const GameStateInit: IGameState = {
  player: {
    healthCount: 3,
  },
  enemiesDefeated: 0,
  status: GameStatus.showControls,
  playersMode: null,
};

export const slice = createSlice({
  name: 'game',
  initialState: GameStateInit,
  reducers: {
    resetGame(state) {
      state.player.healthCount = 3;
      state.enemiesDefeated = 0;
      state.enemiesDefeated = 0;
      state.status = GameStatus.showControls;
      state.playersMode = null;
    },
    decreaseHealthCount(state) {
      if (state.player.healthCount > 0) {
        state.player.healthCount -= 1;
      }
    },
    setPlayersMode(state, action: PayloadAction<PlayersMode>) {
      state.playersMode = action.payload;
    },
    defeatEnemy(state) {
      state.enemiesDefeated += 1;
    },
    setGameStatus(state, action: PayloadAction<GameStatus>) {
      state.status = action.payload;
    },
  },
});

export const {
  decreaseHealthCount,
  setGameStatus,
  defeatEnemy,
  setPlayersMode,
  resetGame,
} = slice.actions;

export default slice.reducer;
