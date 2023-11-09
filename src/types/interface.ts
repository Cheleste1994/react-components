import { ReactChild } from 'react';

export interface AppProps {
  dataSearch?: ApiResponseState;
}

export interface ErrorBoundaryProps {
  children: ReactChild;
}

export interface ErrorBoundaryState {
  error: Error | null;
}

export interface ApiResponseState {
  isLoading: boolean;
  dataResponse: ProductList | null;
}

export interface IdResponseState {
  isLoading: boolean;
  dataId: Product | null;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductList {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
