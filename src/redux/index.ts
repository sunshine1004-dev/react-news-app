import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './auth-slice';
import AppSlice from './app-slice';


export const store = configureStore({
  reducer: {
    app: AppSlice,
    auth: AuthReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;

export default store;