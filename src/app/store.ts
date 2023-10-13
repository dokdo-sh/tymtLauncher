import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gameReducer from '../lib/store/gameSlice';
import currentGameReducer from '../lib/store/currentGameSlice';
import currentWalletReducer from '../lib/store/walletSlice';
import sessionReducer from '../lib/store/sessionSlice'
import appReducer from '../lib/store/appSlice'
<<<<<<< HEAD
import searchReducer from '../lib/store/searchSlice'
=======
>>>>>>> e247bcb19599fded64ad44f70b12b4c323d433b9

export const store = configureStore({
  reducer: {
    game: gameReducer,
    currentGame: currentGameReducer,
    wallet: currentWalletReducer,
    session: sessionReducer,
<<<<<<< HEAD
    app: appReducer,
    search: searchReducer,
=======
    app: appReducer
>>>>>>> e247bcb19599fded64ad44f70b12b4c323d433b9
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
