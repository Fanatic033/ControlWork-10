import { Comments } from '../../types.ts';
import { createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, fetchCommentsByNewsId } from './commentThunks.ts';

interface CommentsState {
  items: Comments[];
  isLoading: boolean;
  isCreating: boolean;
}

const initialState: CommentsState = {
  items: [],
  isLoading: false,
  isCreating: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  selectors: {
    selectComments: (state) => state.items,
    selectIsLoading: (state) => state.isLoading,
    selectIsCreating: (state) => state.isCreating,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByNewsId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCommentsByNewsId.fulfilled, (state, { payload: comments }) => {
        state.isLoading = false;
        state.items = comments;
      })
      .addCase(fetchCommentsByNewsId.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(createComment.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createComment.fulfilled, (state, { payload: newComment }) => {
        state.isCreating = false;
        state.items.push(newComment);
      })
      .addCase(createComment.rejected, (state) => {
        state.isCreating = false;
      });
    builder
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.items = state.items.filter(comment => comment.id !== action.meta.arg);
      });
  },
});

export const commentsReducer = commentsSlice.reducer;

export const { selectComments, selectIsLoading, selectIsCreating } = commentsSlice.selectors;