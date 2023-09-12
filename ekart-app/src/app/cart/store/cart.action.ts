import { createAction, props } from '@ngrx/store';
import { Cart } from '../cart.model';

export const onGetCart = createAction('ON_GET_CART');
export const populateCart = createAction(
  'POPULATE_CART',
  props<{ carts: Cart[] }>()
);
export const onGetCartFail = createAction('ON_GET_CART_FAIL');
export const onAddItemToCart = createAction(
  'ON_ADD_ITEM_TO_CART',
  props<{ cart: Cart }>()
);
export const onAddItemToCartFail = createAction('ON_ADD_ITEM_TO_CART_FAIL');
export const onModifyCart = createAction(
  'ON_MODIFY_CART',
  props<{ cartId: number; quantity: number }>()
);
export const onModifyCartFail = createAction('ON_MODIFY_CART_FAIL');
export const onDeleteItemFromCart = createAction(
  'on_DELETE_ITEM_FROM_CART',
  props<{ cartId: number }>()
);
export const onDeleteItemFromCartFail = createAction(
  'on_DELETE_ITEM_FROM_CART_FAIL'
);
