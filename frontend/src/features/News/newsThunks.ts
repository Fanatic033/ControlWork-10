import { createAsyncThunk } from '@reduxjs/toolkit';
import { News } from '../../types.ts';
import axiosApi from '../../axiosApi.ts';

export const fetchNewsThunks = createAsyncThunk<News[]>('/news/fetchAll',
  async () => {
    const {data: news} = await axiosApi.get<News[]>('news')
    return news
  })