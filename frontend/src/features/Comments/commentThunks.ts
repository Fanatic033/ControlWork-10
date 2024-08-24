import { createAsyncThunk } from '@reduxjs/toolkit';
import { Comments, CommentMutation } from '../../types.ts';
import axiosApi from '../../axiosApi.ts';

export const fetchCommentsByNewsId = createAsyncThunk<Comments[], string>(
  'comments/fetchByNewsId',
  async (newsId) => {
    const {data: comments} = await axiosApi.get<Comments[]>(`comments/news/${newsId}/comments`);
    return comments;
  }
);


export const createComment = createAsyncThunk<Comments, CommentMutation>(
  'comments/create',
  async (commentMutation) => {
    const {data: newComment} = await axiosApi.post<Comments>(`news/${commentMutation.id_news}/comments`, commentMutation);
    return newComment;
  }
);


export const deleteComment = createAsyncThunk<void, number>(
  'comments/delete',
  async (id: number) => {
    await axiosApi.delete(`comments/${id}`);
  }
);
