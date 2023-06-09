import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  NewsApiQuery,
  GuardianQuery,
  NewsApiCallMethod,
  Feed,
} from "@/type";
import api from "@/api";

export interface FeedState {
  feeds: Feed[];
}

export const initialState = {
  feeds: []
};

export const getFeeds = createAsyncThunk(
  "feed/getFeeds",
  async ({
    query,
    method,
  }: {
    query: NewsApiQuery;
    method: NewsApiCallMethod;
  }) => {
    const response = await api.NewsApiCall(query, method);
    return response.data;
  }
);

export const getGuardianApiArticles = createAsyncThunk(
  "news/getGuardianApiArticles",
  async(query: GuardianQuery) => {
    const response = await api.GuardianApiCall(query);
    return response.data;
  }
)

export const FeedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    // setType: (
    //   state,
    //   action: PayloadAction<"newsapi" | "guardian" | "nytimes">
    // ) => {
    //   state.type = action.payload;
    // },
    // setLoading: (state, action: PayloadAction<boolean>) => {
    //   state.loading = action.payload;
    // },
    // setNewsApiQuery: (state, action: PayloadAction<NewsApiQuery>) => {
    //   state.newsApiQuery = action.payload
    // },
    // setGuardianQuery: (state, action: PayloadAction<GuardianQuery>) => {
    //   state.guardianQuery = action.payload
    // }
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getNewsApiArticles.pending, (state) => {
  //     state.loading = true;
  //   }),
  //   builder.addCase(getNewsApiArticles.fulfilled, (state, action) => {
  //     state.loading = false;
  //     state.articles = action.payload.articles;
  //     state.total = action.payload.totalResults;
  //   }),
  //   builder.addCase(getNewsApiArticles.rejected, (state, action) => {
  //     state.loading = false;
  //     state.error = action.error.message || "";
  //   }),
  //   builder.addCase(getGuardianApiArticles.pending, (state) => {
  //     state.loading = true;
  //   }),
  //   builder.addCase(getGuardianApiArticles.fulfilled, (state, action) => {
  //     state.loading = false;
  //     state.articles = action.payload.results;
  //     state.total = action.payload.total;
  //   }),
  //   builder.addCase(getGuardianApiArticles.rejected, (state, action) => {
  //     state.loading = false;
  //     state.error = action.error.message || "";
  //   })
  // }
});

export const { } = FeedSlice.actions;

export default FeedSlice.reducer;
