// data-service.mock.js
import { IdResponseState } from '../../../types/interface';

const dataIdCard: IdResponseState = {
  isLoading: false,
  dataId: {
    id: 1,
    title: 'Product 1',
    brand: 'Brand 1',
    category: 'Category 1',
    description: 'Description 1',
    price: 100,
  },
};

export default {
  ...jest.requireActual('../../../api/data-service'),
  makeRequest: jest.fn().mockResolvedValue({ data: dataIdCard.dataId }),
};
