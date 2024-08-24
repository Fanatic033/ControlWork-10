import { News } from '../../types.ts';
import { createSlice } from '@reduxjs/toolkit';


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
})

export const newsReducer = newsSlice.reducer;

export const {selectNews, selectIsLoading} = newsSlice.selectors