import { createAction, props } from '@ngrx/store';
import { Product } from '../product.model';

export const onGetProducts = createAction(
  'ON_GET_PRODUCTS',
  props<{ searchParam: string }>()
);

export const populateProducts = createAction(
  'POPULATE_PRODUCTS',
  props<{ products: Product[] }>()
);

export const onGetProductsFail = createAction('ON_GET_PRODUCTS_FAIL');

export const onSelectProduct = createAction(
  'ON_SELECT_PRODUCT',
  props<{ product: Product }>()
);

export const onGetProductDetailsById = createAction(
  'ON_GET_PRODUCT_DETAILS_BY_ID',
  props<{ productId: number }>()
);

export const onGetProductDetailsByIdFail = createAction(
  'ON_GET_PRODUCT_DETAILS_BY_ID_FAIL'
);

export const populateProductDetailsForId = createAction(
  'POPULATE_PRODUCT_DETAILS_FOR_ID',
  props<{ product: Product }>()
);
