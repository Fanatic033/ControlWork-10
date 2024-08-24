import { News } from '../../types.ts';
import { createSlice } from '@reduxjs/toolkit';
import { createNews, deleteNews, fetchNewsThunks, fetchOneNew } from './newsThunks.ts';


interface NewsState {
  items: News[];
  tiding: News | null;
  isLoading: boolean;
  isCreate: boolean;
  oneFetching: boolean;
}

const initialState: NewsState = {
  items: [],
  tiding: null,
  isLoading: false,
  isCreate: false,
  oneFetching: false,
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  selectors: {
    selectNews: (state) => state.items,
    selectIsLoading: (state) => state.isLoading,
    selectIsCreating: (state) => state.isCreate,
    selectTiding: (state) => state.tiding,
    selectOneFetching: (state) => state.oneFetching,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsThunks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNewsThunks.fulfilled, (state, {payload: news}) => {
        state.isLoading = false;
        state.items = news
      })
      .addCase(fetchNewsThunks.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(createNews.pending, (state) => {
        state.isCreate = true;
      })
      .addCase(createNews.fulfilled, (state) => {
        state.isCreate = false;
      })
      .addCase(createNews.rejected, (state) => {
        state.isCreate = false;
      })
    builder
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.items = state.items.filter(news => news.id.toString() !== action.meta.arg);
      });
    builder
      .addCase(fetchOneNew.pending, (state) => {
        state.oneFetching = true
      })
      .addCase(fetchOneNew.fulfilled, (state, {payload: tiding}) => {
        state.oneFetching = false;
        state.tiding = tiding
      })
      .addCase(fetchOneNew.rejected, (state) => {
        state.oneFetching = false
      })
  }
})

export const newsReducer = newsSlice.reducer;

export const {selectNews, selectIsLoading, selectIsCreating,selectTiding,selectOneFetching} = newsSlice.selectors