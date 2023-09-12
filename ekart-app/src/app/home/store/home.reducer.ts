import { createReducer, on } from '@ngrx/store';
import {
  onSelectProduct,
  populateProductDetailsForId,
  populateProducts,
} from './home.action';

export const initialState = {
  products: [],
  selectedProduct: null,
};

export const homeReducer = createReducer(
  initialState,
  on(populateProducts, (state, action) => {
    return {
      ...state,
      products: action.products,
    };
  }),
  on(populateProductDetailsForId, (state, action) => {
    return {
      ...state,
      selectedProduct: action.product,
    };
  })
);
