import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAlertState {
  message: string | null
  timestamp: string
}

const AlertStateInit: IAlertState = {
  message: null,
  timestamp: '',
};

export const slice = createSlice({
  name: 'alert',
  initialState: AlertStateInit,
  reducers: {
    setAlert(state, action: PayloadAction<string | null>) {
      state.message = action.payload;
      state.timestamp = new Date().toString();
    },
  },
});

export const {
  setAlert,
} = slice.actions;

export default slice.reducer;
