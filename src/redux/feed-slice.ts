import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Feed } from "@/type";
import api from "@/api";

export interface FeedState {
  feeds: Feed[];
  loading: boolean;
}

export const initialState: FeedState = {
  feeds: [],
  loading: false,
};

export const getFeeds = createAsyncThunk(
  "feed/getFeeds",
  async () => {
    const response = await api.GetFeedsAll();
    return response.data;
  }
);

export const createFeed = createAsyncThunk(
  "feed/createFeed",
  async({
    feed, id
  }: {
    feed: Feed;
    id?: string
  }) => {
    const response = await api.CreateFeed(feed, id);
    return response.data;
  }
)

export const removeFeed = createAsyncThunk(
  "feed/removeFeed",
  async(id: string) => {
    const response = await api.RemoveFeed(id);
    return response.data;
  }
)

export const FeedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getFeeds.fulfilled, (state, action) => {
      state.feeds = action.payload;
    }),
    builder.addCase(createFeed.pending, (state) => {
      state.loading = true;
    }),
    builder.addCase(createFeed.fulfilled, (state, action) => {
      state.loading = false;
      state.feeds = state.feeds.concat(action.payload);
    }),
    builder.addCase(removeFeed.pending, (state) => {
      state.loading = true;
    }),
    builder.addCase(removeFeed.fulfilled, (state, action) => {
      state.loading = false;
      state.feeds = state.feeds.filter(item => item.id?.toString() !== action.payload);
    })
  }
});

export const { } = FeedSlice.actions;

export default FeedSlice.reducer;
