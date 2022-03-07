import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { LOCALHOST_CHAIN_ID } from '../../utils/constants';

const initialState = {
  chainId: LOCALHOST_CHAIN_ID,
  name: '',
  symbol: '',
};

export const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    resetNetwork: (state: Draft<typeof initialState>) => {
      state.chainId = LOCALHOST_CHAIN_ID;
      state.name = '';
      state.symbol = '';
    },
    setNetwork: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState>
    ) => {
      state.chainId = action.payload.chainId;
      state.name = action.payload.name;
      state.symbol = action.payload.symbol;
    },
  },
});

// Selectors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getNetwork = (state: any) => state.network;

// Reducers and actions
export const { resetNetwork, setNetwork } = networkSlice.actions;

export default networkSlice.reducer;
