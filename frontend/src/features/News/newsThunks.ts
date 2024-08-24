import { createAsyncThunk } from '@reduxjs/toolkit';
import { News, NewsMutation } from '../../types.ts';
import axiosApi from '../../axiosApi.ts';

export const fetchNewsThunks = createAsyncThunk<News[]>('/news/fetchAll',
  async () => {
    const {data: news} = await axiosApi.get<News[]>('news')
    return news
  })

export const createNews = createAsyncThunk<void, NewsMutation>('/news/create', async (newsMutation) => {
  const formData = new FormData();
  formData.append('title', newsMutation.title);
  formData.append('describe', newsMutation.describe);

  if (newsMutation.image) {
    formData.append('image', newsMutation.image);
  }
  await axiosApi.post('/news', formData);
});