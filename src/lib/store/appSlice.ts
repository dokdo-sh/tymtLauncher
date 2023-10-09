import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface AppState {
    value: string;
}

const initialState: AppState = {
    value: "linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url('/backgrounds/tymt.jpg') no-repeat",
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppState: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});
  
export const {setAppState } = appSlice.actions;
  
export const getAppState = (state: RootState) => state.app.value;
  
export default appSlice.reducer;
  