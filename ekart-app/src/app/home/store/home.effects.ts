import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  onGetProductDetailsById,
  onGetProductDetailsByIdFail,
  onGetProducts,
  onGetProductsFail,
  populateProductDetailsForId,
  populateProducts,
} from './home.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { Product } from '../product.model';
import { AppConstants } from 'src/app/common/constants/app-constants.model';
import { Injectable } from '@angular/core';
import { onGetCart } from 'src/app/cart/store/cart.action';
import {
  ToastMessages,
  ToastService,
} from 'src/app/common/toast/toast.service';

@Injectable()
export class HomeEffects {
  getProducts$ = createEffect(() =>
    this.action$.pipe(
      ofType(onGetProducts),
      switchMap((data) => {
        return this.http
          .get<Product[]>(AppConstants.BASE_URL + 'products', {
            params: { searchParam: data.searchParam },
          })
          .pipe(
            map((response) => {
              return populateProducts({ products: response });
            }),
            catchError(() => {
              this.toast.showToastMessage(
                'Unable to load products',
                ToastMessages.danger
              );
              setTimeout(() => {
                this.toast.showToast$.next(false);
              }, 3000);
              return of(onGetProductsFail());
            })
          );
      })
    )
  );

  getProductDetailsById$ = createEffect(() =>
    this.action$.pipe(
      ofType(onGetProductDetailsById),
      switchMap((data) => {
        return this.http
          .get<Product>(AppConstants.BASE_URL + 'product/' + data.productId)
          .pipe(
            map((response) => {
              return populateProductDetailsForId({ product: response });
            }),
            catchError(() => {
              this.toast.showToastMessage(
                'Unable to load product details',
                ToastMessages.danger
              );
              setTimeout(() => {
                this.toast.showToast$.next(false);
              }, 3000);
              return of(onGetProductDetailsByIdFail());
            })
          );
      })
    )
  );

  constructor(
    private action$: Actions,
    private http: HttpClient,
    private toast: ToastService
  ) {}
}
