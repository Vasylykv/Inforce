import axios from 'axios';
import { IComment } from '../../models/IComment';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchComments = createAsyncThunk(
  'comment/fetchComments',
  async (_, thunkApi) => {
    try {
      const response = await axios.get(`http://localhost:3001/comments`);
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue('Could not fetch comments');
    }
  }
);

export const addComment = createAsyncThunk(
  'comment/addComment',
  async (comment: IComment, thunkApi) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/comments`,
        comment
      );
      return comment;
    } catch (e) {
      return thunkApi.rejectWithValue('Could not add comment');
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comment/deleteComment',
  async (commentId: number, thunkApi) => {
    try {
      await axios.delete(`http://localhost:3001/comments/${commentId}`);
      return commentId;
    } catch (e) {
      return thunkApi.rejectWithValue('Could not add comment');
    }
  }
);
