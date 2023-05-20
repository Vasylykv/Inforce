import { configureStore } from '@reduxjs/toolkit';
import productReducer from './reducers/ProductSlice';
import commentReducer from './reducers/CommentSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    comment: commentReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
