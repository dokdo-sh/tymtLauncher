import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ChatState {
    partnerName: string;
  }

  const initialState: ChatState = {
    partnerName: "",
  };

  export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
      changePartner: (state, action: PayloadAction<string>) => {
        state.partnerName = action.payload;
      },
    },
  });
  
  export const { changePartner } = chatSlice.actions;
  
  export const getPartnerName = (state: RootState) => state.chat.partnerName;
    
  export default chatSlice.reducer;
  