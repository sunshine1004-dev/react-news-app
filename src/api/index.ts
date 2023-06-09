import axios from "axios";
const baseUrl = "http://localhost:8000/api/";

import { SignUpPayload } from "@/features/sign-up/type";
import { SignInPayload } from "@/features/sign-in/type";
import { NewsApiQuery, NewsApiCallMethod, GuardianQuery } from "@/type";

export const SignUp = (user: SignUpPayload) =>
  axios.post(`${baseUrl}register`, user);

export const SignIn = (user: SignInPayload) =>
  axios.post(`${baseUrl}login`, user);

export const LogOut = () => axios.post(`${baseUrl}logout`);

export const NewsApiCall = (query: NewsApiQuery, method: NewsApiCallMethod) => {
  if (method === 'topHeadlines') {
    return axios.post(`${baseUrl}newsapi`, query);
  } else {
    return axios.post(`${baseUrl}newsapi/everything`, query);
  }
}

export const GuardianApiCall = (query: GuardianQuery) => {
  return axios.post(`${baseUrl}guardianapi`, query);
}

export default {
  SignUp,
  SignIn,
  LogOut,
  NewsApiCall,
  GuardianApiCall,
};
