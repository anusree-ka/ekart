import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemsToOrder } from './items-to-order.model';
import { Order } from '../order.model';
import { HttpClient } from '@angular/common/http';
import {
  ToastMessages,
  ToastService,
} from 'src/app/common/toast/toast.service';
import { AppConstants } from 'src/app/common/constants/app-constants.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { onDeleteItemFromCart } from 'src/app/cart/store/cart.action';

@Injectable({
  providedIn: 'root',
})
export class PlaceOrderService {
  itemsToOrderEvent = new BehaviorSubject<ItemsToOrder[]>([]);

  constructor(
    private http: HttpClient,
    private toast: ToastService,
    private router: Router,
    private store: Store
  ) {}

  addItemsToOrder(items: ItemsToOrder[]) {
    this.itemsToOrderEvent.next(items);
  }

  placeOrder(order: Order, cartId: number) {
    this.http.post(AppConstants.BASE_URL + 'order', order).subscribe({
      next: () => {
        this.toast.showToastMessage(
          'Order placed successfully',
          ToastMessages.success
        );
        setTimeout(() => {
          this.toast.showToast$.next(false);
        }, 3000);
        this.router.navigate(['orders']);
        if (cartId) {
          this.store.dispatch(onDeleteItemFromCart({ cartId: cartId }));
        }
      },
      error: () => {
        this.toast.showToastMessage(
          'Unable to place your order',
          ToastMessages.danger
        );
        setTimeout(() => {
          this.toast.showToast$.next(false);
        }, 3000);
      },
    });
  }
}
