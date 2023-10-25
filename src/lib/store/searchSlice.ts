import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface SearchState {
    value: string;
  }

  const initialState: SearchState = {
    value: "",
  };

  export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
      changeSearch: (state, action: PayloadAction<string>) => {
        state.value = action.payload;
      },
    },
  });
  
  export const { changeSearch } = searchSlice.actions;
  
  export const getSearch = (state: RootState) => state.search.value;
    
  export default searchSlice.reducer;
  