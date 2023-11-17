import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductList } from '../../types/interface';

interface ProductsSlice {
  dataSearch: {
    isLoading: boolean;
    dataResponse: ProductList | undefined;
  };
  searchValue: string;
  page: number;
}

const initialState: ProductsSlice = {
  dataSearch: {
    isLoading: true,
    dataResponse: undefined,
  },
  searchValue: localStorage.getItem('inputValue') || '',
  page: 1,
};

const productSlice = createSlice({
  name: 'Products',
  initialState,
  reducers: {
    setDataSearch: (
      state,
      action: PayloadAction<{
        isLoading: boolean;
        productList: ProductList | undefined;
      }>
    ) => {
      state.dataSearch.isLoading = action.payload?.isLoading;
      state.dataSearch.dataResponse = action.payload?.productList;
    },
    setSearchValue: (state, action: PayloadAction<{ inputValue: string }>) => {
      state.searchValue = action.payload.inputValue;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { setDataSearch, setSearchValue, setPage } = productSlice.actions;

export default productSlice.reducer;
