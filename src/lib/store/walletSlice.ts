import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import Core, { BlockchainKey } from '../core/Core';

export type Wallet = {mnemonic: string, name: string}

export interface WalletState {
    value: Wallet | undefined;
    status: 'idle' | 'loading' | 'failed';
  }

  const initialState: WalletState = {
    value: {mnemonic:"goddess fish saddle original badge vintage shed page usual address practice focus", name: "wallet1"},
    status: 'idle',
  };

  export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
      changeWallet: (state, action: PayloadAction<Wallet | undefined>) => {
        state.value = action.payload;
      },
    },
  });
  
  export const {changeWallet } = walletSlice.actions;
  
  export const selectWallet = (state: RootState) => state.wallet.value;
    
  export default walletSlice.reducer;
  