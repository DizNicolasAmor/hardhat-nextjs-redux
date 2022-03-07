import { configureStore } from '@reduxjs/toolkit';

import networkReducer from './slices/networkSlice';
import tokenReducer from './slices/tokenSlice';
import userReducer from './slices/userSlice';

export default configureStore({
  reducer: {
    network: networkReducer,
    token: tokenReducer,
    user: userReducer,
  },
});
