import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../models/IProduct';
import {
  fetchProducts,
  addProduct,
  deleteProduct,
} from '../actions/ProductActions';

interface ProductState {
  products: IProduct[];
  isLoading: boolean;
  error: string;
}

const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: '',
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.fulfilled.type]: (
      state,
      action: PayloadAction<IProduct[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.products = action.payload;
    },
    [fetchProducts.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [fetchProducts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteProduct.fulfilled.type]: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    [addProduct.fulfilled.type]: (state, action: PayloadAction<IProduct>) => {
      state.products.push(action.payload);
    },
  },
});

export default productSlice.reducer;
