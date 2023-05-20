import axios from 'axios';
import { IProduct } from '../../models/IProduct';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'product/fetchAll',
  async (_, thunkApi) => {
    try {
      const response = await axios.get<IProduct[]>(
        'http://localhost:3001/products'
      );
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue(`Could not fetch products`);
    }
  }
);

export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (product: IProduct, thunkApi) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/products',
        product
      );
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue(`Could not add this product`);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (productId: number, thunkApi) => {
    try {
      await axios.delete(`http://localhost:3001/products/${productId}`);
      return productId;
    } catch (e) {
      return thunkApi.rejectWithValue(`Could not delete this product`);
    }
  }
);
