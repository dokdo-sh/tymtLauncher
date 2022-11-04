import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type Session = {logged: boolean, password:string|undefined} 

export interface SessionState {
    value: Session;
    status: 'idle' | 'loading' | 'failed';
  }

  const initialState: SessionState = {
    value: {logged:false, password:undefined},
    status: 'idle',
  };

  export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
      changeSession: (state, action: PayloadAction<Session>) => {
        state.value = action.payload;
      },
    },
  });
  
  export const { changeSession } = sessionSlice.actions;
  
  export const getSession = (state: RootState) => state.session.value;
    
  export default sessionSlice.reducer;
  