import detailReducer, {
  ProductDetailState,
  setProductId,
  clearProductId,
} from '../slice/detail.slice';

const initialState: ProductDetailState = {
  isLoading: true,
  dataId: undefined,
  isOpen: false,
};

describe('Detail slice', () => {
  it('should add new product with "setProductId" action', () => {
    const product = {
      isLoading: false,
      dataId: { id: 1, title: 'Detail' },
    };

    const action = {
      type: setProductId.type,
      payload: product,
    };
    const result = detailReducer(initialState, action);

    expect(result).toEqual({ ...product, isOpen: true });
  });

  it('should remove product with "clearProductId" action', () => {
    const action = {
      type: clearProductId.type,
    };
    const result = detailReducer(initialState, action);

    expect(result).toEqual(initialState);
  });
});
