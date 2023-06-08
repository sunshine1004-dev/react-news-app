import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './auth-slice';
import AppSlice from './app-slice';
import NewsSlice from './news-slice';

export const store = configureStore({
  reducer: {
    app: AppSlice,
    auth: AuthReducer,
    news: NewsSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;

export default store;