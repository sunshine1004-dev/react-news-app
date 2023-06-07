import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "@/api";
import { User } from "@/type";

import { SignInPayload } from "@/features/sign-in/type";
import { SignUpPayload } from "@/features/sign-up/type";

export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string;
  user: User | undefined;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: "",
  user: undefined,
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (user: SignUpPayload) => {
    const response = await api.SignUp(user);
    return response.data;
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (user: SignInPayload) => {
    const response = await api.SignIn(user);
    return response.data;
  }
);

export const logOut = createAsyncThunk(
  "auth/logOut",
  async () => {
    const response = await api.LogOut();
    return response.data;
  }
)

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(signUp.fulfilled, (state) => {
        state.loading = false;
      }),
      builder.addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      }),
      builder.addCase(signIn.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(signIn.fulfilled, (state) => {
        state.loading = false;
      }),
      builder.addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      });
  },
});

export const { setIsAuthenticated, setUser } = AuthSlice.actions;

export default AuthSlice.reducer;
