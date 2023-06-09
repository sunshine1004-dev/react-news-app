import jwtDecode from "jwt-decode";
import { setUser } from "@/redux/auth-slice";
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
  setUserInfo(dispatch);
};

export const setUserInfo = (dispatch: any) => {
  const user: string = localStorage.getItem("user") || "";
  dispatch(setUser(JSON.parse(user)));
};

export const logOut = (dispatch: any) => {
  // dispatch('/sign-in');
  localStorage.removeItem('user');
  localStorage.removeItem('jwtToken');
  dispatch()
}
