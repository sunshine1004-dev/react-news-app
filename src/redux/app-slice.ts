import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LayoutState {
  isSiderOpen: boolean
}

const initialState: LayoutState = {
  isSiderOpen: true
}

export const AppSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setSider: (state, action: PayloadAction<boolean>) => {
      state.isSiderOpen = action.payload;
    },
  }
});

export const { setSider } = AppSlice.actions;

export default AppSlice.reducer 
