import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  NewsApiArticle,
  NewsApiQuery,
  GuardianQuery,
  NewsApiCallMethod,
} from "@/type";
import api from "@/api";

const newapiKey = import.meta.env.VITE_NEWS_API_KEY;

export interface NewsState {
  total: number;
  type: "newsapi" | "guardian" | "nytimes";
  articles: NewsApiArticle[];
  fetchMethod?: NewsApiCallMethod;
  newsApiQuery: NewsApiQuery;
  guardianQuery: GuardianQuery;
  loading: boolean;
  error: string;
}

export const initialState: NewsState = {
  total: 1000,
  type: "newsapi",
  articles: [],
  fetchMethod: "topHeadlines",
  newsApiQuery: {
    page: 1,
    pageSize: 10,
    sortBy: "relevancy",
    apiKey: newapiKey,
  },
  guardianQuery: {
    page: 1,
    "page-size": 10,
    "order-by": "newest",
  },
  error: "",
  loading: false,
};

export const getNewsApiArticles = createAsyncThunk(
  "news/getNewsApiArticles",
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

export const NewsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setType: (
      state,
      action: PayloadAction<"newsapi" | "guardian" | "nytimes">
    ) => {
      state.type = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setNewsApiQuery: (state, action: PayloadAction<NewsApiQuery>) => {
      state.newsApiQuery = action.payload
    },
    setGuardianQuery: (state, action: PayloadAction<GuardianQuery>) => {
      state.guardianQuery = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getNewsApiArticles.pending, (state) => {
      state.loading = true;
    }),
    builder.addCase(getNewsApiArticles.fulfilled, (state, action) => {
      state.loading = false;
      state.articles = action.payload.articles;
      state.total = action.payload.totalResults;
    }),
    builder.addCase(getNewsApiArticles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    }),
    builder.addCase(getGuardianApiArticles.pending, (state) => {
      state.loading = true;
    }),
    builder.addCase(getGuardianApiArticles.fulfilled, (state, action) => {
      state.loading = false;
      state.articles = action.payload.results;
      state.total = action.payload.total;
    }),
    builder.addCase(getGuardianApiArticles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    })
  }
});

export const { setType, setLoading, setNewsApiQuery, setGuardianQuery } = NewsSlice.actions;

export default NewsSlice.reducer;
