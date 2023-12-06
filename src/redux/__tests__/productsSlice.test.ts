import { ProductsSlice } from '../slice/products.slice';
import productsReducer, {
  setDataSearch,
  setSearchValue,
  setPage,
} from '../slice/products.slice';

const initialState: ProductsSlice = {
  dataSearch: {
    isLoading: true,
    dataResponse: null,
  },
  searchValue: '',
  page: 1,
};

describe('Products slice', () => {
  it('should add new products with "setProductId" action', () => {
    const productList = {
      total: 100,
      skip: 0,
      limit: 10,
      products: [
        {
          id: 1,
          title: 'Product 1',
          brand: 'Brand 1',
          category: 'Category 1',
          images: ['1', '2'],
        },
        {
          id: 2,
          title: 'Product 2',
          brand: 'Brand 2',
          category: 'Category 2',
          images: ['1', '2'],
        },
      ],
    };

    const action = {
      type: setDataSearch.type,
      payload: { isLoading: false, productList },
    };
    const result = productsReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      dataSearch: { isLoading: false, dataResponse: productList },
    });

    expect(result.dataSearch.dataResponse?.products.length).toBe(2);
  });

  it('should add new search value with "setSearchValue" action', () => {
    const action = {
      type: setSearchValue.type,
      payload: { inputValue: 'Test' },
    };
    const result = productsReducer(initialState, action);

    expect(result).toEqual({ ...initialState, searchValue: 'Test' });
  });

  it('should add new page with "setPage" action', () => {
    const action = {
      type: setPage.type,
      payload: 2,
    };
    const result = productsReducer(initialState, action);

    expect(result).toEqual({ ...initialState, page: 2 });
  });
});
