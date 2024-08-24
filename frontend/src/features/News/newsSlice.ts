import { News } from '../../types.ts';
import { createSlice } from '@reduxjs/toolkit';
import { fetchNewsThunks } from './newsThunks.ts';


interface NewsState {
  items: News[];
  isLoading: boolean;
}

const initialState: NewsState = {
  items: [],
  isLoading: false,
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  selectors: {
    selectNews: (state) => state.items,
    selectIsLoading: (state) => state.isLoading
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
      })
  }
})

export const newsReducer = newsSlice.reducer;

export const {selectNews, selectIsLoading} = newsSlice.selectors