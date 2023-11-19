import detailReducer, { ProductDetailState } from '../slice/detail.slice';
import productsReducer, { ProductsSlice } from '../slice/products.slice';

describe('Store', () => {
  it('should return default Products state when passed an empty action', () => {
    const initialState: ProductsSlice = {
      dataSearch: {
        isLoading: true,
        dataResponse: undefined,
      },
      searchValue: '',
      page: 1,
    };

    const result = productsReducer(undefined, { type: '' });

    expect(result).toEqual(initialState);
  });

  it('should return default Detail state when passed an empty action', () => {
    const initialState: ProductDetailState = {
      isLoading: true,
      dataId: undefined,
      isOpen: false,
    };

    const result = detailReducer(undefined, { type: '' });

    expect(result).toEqual(initialState);
  });
});
