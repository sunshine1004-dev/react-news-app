import axios from "axios";
const baseUrl = "http://localhost:8000/api/";

import { SignUpPayload } from "@/features/sign-up/type";
import { SignInPayload } from "@/features/sign-in/type";

export const SignUp = (user: SignUpPayload) =>
  axios.post(`${baseUrl}register`, user);

export const SignIn = (user: SignInPayload) =>
  axios.post(`${baseUrl}login`, user);

export const LogOut = () => axios.post(`${baseUrl}logout`);

export default {
  SignUp,
  SignIn,
  LogOut
};
