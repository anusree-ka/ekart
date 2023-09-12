import { createReducer, on } from '@ngrx/store';
import { Cart } from '../cart.model';
import { populateCart } from './cart.action';

export const initialState = {
  carts: [],
};

export const cartReducer = createReducer(
  initialState,
  on(populateCart, (state, action) => {
    return {
      ...state,
      carts: action.carts,
    };
  })
);
