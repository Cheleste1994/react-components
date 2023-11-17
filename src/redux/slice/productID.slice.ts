import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/interface';

interface ProductIDState {
  isLoading: boolean;
  dataId: Product | undefined;
}

const initialState: ProductIDState = {
  isLoading: true,
  dataId: undefined,
};

const productId = createSlice({
  name: 'ProductID',
  initialState,
  reducers: {
    setProductId: (state, action: PayloadAction<ProductIDState>) => {
      state.dataId = action.payload.dataId;
      state.isLoading = action.payload.isLoading;
    },
    clearProductId: (state) => {
      state.dataId = undefined;
      state.isLoading = true;
    },
  },
});

export const { setProductId, clearProductId } = productId.actions;

export default productId.reducer;
