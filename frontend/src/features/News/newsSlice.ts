import { News } from '../../types.ts';
import { createSlice } from '@reduxjs/toolkit';
import { createNews, deleteNews, fetchNewsThunks } from './newsThunks.ts';


interface NewsState {
  items: News[];
  isLoading: boolean;
  isCreate: boolean;
}

const initialState: NewsState = {
  items: [],
  isLoading: false,
  isCreate: false,
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  selectors: {
    selectNews: (state) => state.items,
    selectIsLoading: (state) => state.isLoading,
    selectIsCreating: (state) => state.isCreate,
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
        state.items = state.items.filter(news => news.id.toString() !== action.meta.arg);  // ХЗ
      });
  }
})

export const newsReducer = newsSlice.reducer;

export const {selectNews, selectIsLoading, selectIsCreating} = newsSlice.selectors