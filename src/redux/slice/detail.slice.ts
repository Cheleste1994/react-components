import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/interface';

export interface ProductDetailState {
  isLoading: boolean;
  dataId: Product | null;
  isOpen: boolean;
}

const initialState: ProductDetailState = {
  isLoading: true,
  dataId: null,
  isOpen: false,
};

const productDetail = createSlice({
  name: 'Product Detail',
  initialState,
  reducers: {
    setProductId: (state, action: PayloadAction<ProductDetailState>) => {
      state.dataId = action.payload.dataId;
      state.isLoading = action.payload.isLoading;
      state.isOpen = true;
    },
    clearProductId: (state) => {
      state.dataId = null;
      state.isLoading = true;
      state.isOpen = false;
    },
  },
});

export const { setProductId, clearProductId } = productDetail.actions;

export default productDetail.reducer;
