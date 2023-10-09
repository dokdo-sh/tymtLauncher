import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import Games, { Game } from '../api/Games';

export interface GameState {
    value: Game | undefined;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: GameState = {
    value: undefined,
    status: 'idle',
};

export const changeAsync = createAsyncThunk(
    'game/fetchCount',
    async () => {
        const response = Games["district53"];
        return response;
    }
);

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        change: (state, action: PayloadAction<Game | undefined>) => {
            state.value = action.payload;
        },
    },
});
  
export const {change } = gameSlice.actions;
  
export const selectGame = (state: RootState) => state.game.value;

export default gameSlice.reducer;
  