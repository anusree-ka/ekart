import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserDetails } from '../auth/user-details.model';
import { ToastMessages, ToastService } from '../common/toast/toast.service';
import { Product } from '../home/product.model';
import { onGetUserDetails } from '../profile/store/profile.action';
import { Order } from './order.model';
import { OrderService } from './order.service';
import { ItemsToOrder } from './place-order/items-to-order.model';
import { PlaceOrderService } from './place-order/place-order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  subscription: Subscription;
  storeSub: Subscription;
  userDetails: UserDetails;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private profileStore: Store<{ profile: { userDetails: UserDetails } }>,
    private toast: ToastService,
    private placeOrderService: PlaceOrderService
  ) {}

  ngOnInit(): void {
    this.subscription = this.orderService.viewOrders().subscribe({
      next: (data) => (this.orders = data.body),
      error: (data) => {
        console.log(data);
        this.toast.showToastMessage(
          'Unable to load your orders',
          ToastMessages.danger
        );
        setTimeout(() => {
          this.toast.showToast$.next(false);
        }, 3000);
      },
    });

    this.profileStore.dispatch(onGetUserDetails());
    this.storeSub = this.profileStore.select('profile').subscribe((data) => {
      this.userDetails = data.userDetails;
    });
  }

  placeOrder(product: Product, index: number) {
    let items: ItemsToOrder[] = [];
    let itemId = 1;

    let item = new ItemsToOrder(
      itemId,
      product,
      this.orders[index].quantity,
      null
    );

    items.push(item);

    this.placeOrderService.addItemsToOrder(items);
    this.router.navigate(['placeOrder']);
  }

  viewProduct(product: Product) {
    let pathVariable = product.productName
      .replaceAll(' ', '_')
      .concat('-', product.productId.toString());

    this.router.navigate(['home/' + pathVariable]);
  }

  goToProducts() {
    this.router.navigate(['home']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
