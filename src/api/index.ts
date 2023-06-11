import axios from "axios";
import { SignUpPayload } from "@/features/sign-up/type";
import { SignInPayload } from "@/features/sign-in/type";
import { NewsApiQuery, NewsApiCallMethod, GuardianQuery } from "@/type";
import queryString from "query-string";
import { Feed } from "@/type";

const baseUrl = import.meta.env.VITE_BASE_URL;
const newsapiUrl = import.meta.env.VITE_NEWS_API_URL;

export const SignUp = (user: SignUpPayload) =>
  axios.post(`${baseUrl}register`, user);

export const SignIn = (user: SignInPayload) =>
  axios.post(`${baseUrl}login`, user);

// export const LogOut = () => axios.post(`${baseUrl}logout`);

export const NewsApiCall = (query: NewsApiQuery, method: NewsApiCallMethod) => {
  if (method === "topHeadlines") {
    return axios.get(`${newsapiUrl}/top-headlines?${queryString.stringify(query)}`);
  } else {
    return axios.get(`${newsapiUrl}/everything?${queryString.stringify(query)}`);
  }
};

export const GuardianApiCall = (query: GuardianQuery) => {
  return axios.post(`${baseUrl}guardianapi`, query);
};

export const GetFeedsAll = () => {
  return axios.get(`${baseUrl}feed`);
};

export const CreateFeed = (feed: Feed, id?: string) => {
  if (id) {
    return axios.post(`${baseUrl}feed/${id}`, feed);
  } else {
    return axios.post(`${baseUrl}feed`, feed);
  }
};

export const RemoveFeed = (id: string) => {
  return axios.delete(`${baseUrl}feed/${id}`);
}

export default {
  SignUp,
  SignIn,
  NewsApiCall,
  GuardianApiCall,
  GetFeedsAll,
  CreateFeed,
  RemoveFeed,
};
