
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export type CurrentGameStateType = {currentTab: string}
export interface CurrentGameState {
    value: CurrentGameStateType;
    status: 'idle' | 'loading' | 'failed';
  }

  const initialState: CurrentGameState = {
    value: {currentTab: "servers"},
    status: 'idle',
  };

  export const currentGameSlice = createSlice({
    name: 'currentGame',
    initialState,
    reducers: {
      changeTab: (state, action: PayloadAction<string>) => {
        state.value.currentTab = action.payload;
      },
    },
  });
  
  export const {changeTab } = currentGameSlice.actions;
  
  export const selectCurrentGame = (state: RootState) => state.currentGame.value;

  
  export default currentGameSlice.reducer;
  