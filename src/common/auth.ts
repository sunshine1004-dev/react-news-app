import jwtDecode from "jwt-decode";
import { setUser, logOut as logOutAction } from "@/redux/auth-slice";
import axios from 'axios'
import { history } from "@/utility/common";
import { initializeNewsApi } from '@/features/app/app-news-provider';
import { User } from "@/type";

type Payload = {
  user: User;
  access_token: string;
};

export const login = (payload: Payload, dispatch: any) => {
  const decoded: any = jwtDecode(payload.access_token);

  let user: User = {
    id: payload.user.id,
    name: payload.user.name,
    email: payload.user.email,
    exp: decoded.exp,
  };

  localStorage.setItem("jwtToken", payload.access_token);
  localStorage.setItem("user", JSON.stringify(user));
  setAuthorization(dispatch);
  initializeNewsApi();
};

export const setAuthorization = (dispatch: any) => {
  const user = localStorage.getItem("user") || "";
  const token = localStorage.getItem("jwtToken") || "";
  setAuthHeader(token);
  dispatch(setUser(JSON.parse(user)));
};

export const logOut = (dispatch: any) => {
  localStorage.removeItem('user');
  localStorage.removeItem('jwtToken');
  clearAuthHeader();
  dispatch(logOutAction());
  history.navigate("/sign-in");
}

export const setAuthHeader = (token: string) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export const clearAuthHeader = () => {
  axios.defaults.headers.common['Authorization'] = null;
}
