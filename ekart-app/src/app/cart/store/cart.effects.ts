import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  onAddItemToCart,
  onAddItemToCartFail,
  onDeleteItemFromCart,
  onDeleteItemFromCartFail,
  onGetCart,
  onGetCartFail,
  onModifyCart,
  onModifyCartFail,
  populateCart,
} from './cart.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { Cart } from '../cart.model';
import { AppConstants } from 'src/app/common/constants/app-constants.model';
import {
  ToastMessages,
  ToastService,
} from 'src/app/common/toast/toast.service';

@Injectable()
export class CartEffects {
  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private toast: ToastService
  ) {}

  onGetCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(onGetCart),
      switchMap(() => {
        return this.http
          .get<Cart[]>(
            AppConstants.BASE_URL + 'cart/' + sessionStorage.getItem('USERID')
          )
          .pipe(
            map((response) => {
              return populateCart({ carts: response });
            }),
            catchError(() => {
              this.toast.showToastMessage(
                'Unable to fetch cart',
                ToastMessages.danger
              );
              setTimeout(() => {
                this.toast.showToast$.next(false);
              }, 3000);
              return of(onGetCartFail());
            })
          );
      })
    )
  );

  onAddItemToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(onAddItemToCart),
      switchMap((body) => {
        return this.http.post(AppConstants.BASE_URL + 'cart', body.cart).pipe(
          map(() => {
            this.toast.showToastMessage(
              'Added to cart successfully',
              ToastMessages.success
            );
            setTimeout(() => {
              this.toast.showToast$.next(false);
            }, 3000);
            return onGetCart();
          }),
          catchError(() => {
            this.toast.showToastMessage(
              'Unable to add item to cart',
              ToastMessages.danger
            );
            setTimeout(() => {
              this.toast.showToast$.next(false);
            }, 3000);
            return of(onAddItemToCartFail());
          })
        );
      })
    )
  );

  onModifyCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(onModifyCart),
      switchMap((body) => {
        return this.http
          .put(AppConstants.BASE_URL + 'cart/' + body.cartId, null, {
            params: { quantity: body.quantity },
          })
          .pipe(
            map(() => {
              this.toast.showToastMessage(
                'Updated quantity of the item successfully',
                ToastMessages.success
              );
              setTimeout(() => {
                this.toast.showToast$.next(false);
              }, 3000);
              return onGetCart();
            }),
            catchError(() => {
              this.toast.showToastMessage(
                'Unable to update quantity of the item',
                ToastMessages.danger
              );
              setTimeout(() => {
                this.toast.showToast$.next(false);
              }, 3000);
              return of(onModifyCartFail());
            })
          );
      })
    )
  );

  onDeleteItemFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(onDeleteItemFromCart),
      switchMap((data) => {
        return this.http
          .delete(AppConstants.BASE_URL + 'cart/' + data.cartId)
          .pipe(
            map(() => {
              this.toast.showToastMessage(
                'Deleted item from cart successfully',
                ToastMessages.success
              );
              setTimeout(() => {
                this.toast.showToast$.next(false);
              }, 3000);
              return onGetCart();
            }),
            catchError(() => {
              this.toast.showToastMessage(
                'Unable to delete item from your cart',
                ToastMessages.danger
              );
              setTimeout(() => {
                this.toast.showToast$.next(false);
              }, 3000);
              return of(onDeleteItemFromCartFail());
            })
          );
      })
    )
  );
}
