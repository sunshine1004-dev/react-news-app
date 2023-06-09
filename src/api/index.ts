import axios from "axios";
const baseUrl = "http://localhost:8000/api/";

import { SignUpPayload } from "@/features/sign-up/type";
import { SignInPayload } from "@/features/sign-in/type";
import { Feed } from "@/type";
import { NewsApiQuery, NewsApiCallMethod, GuardianQuery } from "@/type";

const token = localStorage.getItem("jwtToken");
const AuthHeader = { headers: { Authorization: "Bearer " + token } };

export const SignUp = (user: SignUpPayload) =>
  axios.post(`${baseUrl}register`, user);

export const SignIn = (user: SignInPayload) =>
  axios.post(`${baseUrl}login`, user);

export const LogOut = () => axios.post(`${baseUrl}logout`);

export const NewsApiCall = (query: NewsApiQuery, method: NewsApiCallMethod) => {
  if (method === "topHeadlines") {
    return axios.post(`${baseUrl}newsapi`, query);
  } else {
    return axios.post(`${baseUrl}newsapi/everything`, query);
  }
};

export const GuardianApiCall = (query: GuardianQuery) => {
  return axios.post(`${baseUrl}guardianapi`, query);
};

export const GetFeedsAll = () => {
  return axios.get(`${baseUrl}feed`, AuthHeader);
};

export const CreateFeed = (feed: Feed, id?: string) => {
  if (id) {
    return axios.post(`${baseUrl}feed/${id}`, feed, AuthHeader);
  } else {
    return axios.post(`${baseUrl}feed`, feed, AuthHeader);
  }
};

export const RemoveFeed = (id: string) => {
  return axios.delete(`${baseUrl}feed/${id}`, AuthHeader);
}

export default {
  SignUp,
  SignIn,
  LogOut,
  NewsApiCall,
  GuardianApiCall,
  GetFeedsAll,
  CreateFeed,
  RemoveFeed,
};
