import { createSlice } from '@reduxjs/toolkit';

import { IComment } from '../../models/IComment';
import {
  fetchComments,
  addComment,
  deleteComment,
} from '../actions/CommentActions';

interface CommentState {
  comments: IComment[];
  isLoading: boolean;
  error: string;
}

const initialState: CommentState = {
  comments: [],
  isLoading: false,
  error: '',
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to fetch comments';
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment) => comment.id !== action.payload
        );
      });
  },
});

export default commentSlice.reducer;
