import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  NewsApiArticle,
  NewsApiQuery,
  GuardianQuery,
  NewsApiCallMethod,
} from "@/type";
import api from "@/api";

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
    page_size: 10,
    sort_by: "relevancy",
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
  "auth/signIn",
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
    setNewsApiQuery: (state) => {
      state.newsApiQuery = initialState.newsApiQuery
    },
    setGuardianQuery: (state) => {
      state.guardianQuery = initialState.guardianQuery
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
    })
  }
});

export const { setType, setLoading, setNewsApiQuery, setGuardianQuery } = NewsSlice.actions;

export default NewsSlice.reducer;
