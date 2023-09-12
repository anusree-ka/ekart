import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserDetails } from 'src/app/auth/user-details.model';
import { Cart } from 'src/app/cart/cart.model';
import { Product } from 'src/app/home/product.model';
import { PlaceOrderService } from './place-order.service';
import { ItemsToOrder } from './items-to-order.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Order } from '../order.model';
import { OrderService } from '../order.service';
import { onDeleteItemFromCart } from 'src/app/cart/store/cart.action';
import { Router } from '@angular/router';
import {
  ToastMessages,
  ToastService,
} from 'src/app/common/toast/toast.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
})
export class PlaceOrderComponent implements OnInit, OnDestroy {
  userDetails: UserDetails;
  profileSubscription: Subscription;
  eventSubscription: Subscription;
  itemsToOrder: ItemsToOrder[];
  orderTotal: number;
  selectedPaymentMethod: string;
  paymentSelectionForm: FormGroup;
  payMentMethods = [
    'Debit Card',
    'Credit Card',
    'Net Banking',
    'UPI',
    'Cash on Delivery',
  ];
  isCartItem = false;

  constructor(
    private service: PlaceOrderService,
    private profileStore: Store<{ profile: { userDetails: UserDetails } }>,
    private formBuilder: FormBuilder,
    private cartStore: Store,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.profileSubscription = this.profileStore
      .select('profile')
      .subscribe((data) => {
        this.userDetails = data.userDetails;
      });
    this.eventSubscription = this.service.itemsToOrderEvent.subscribe(
      (data) => {
        this.itemsToOrder = data;
        this.getOrderTotal();
      }
    );
    this.paymentSelectionForm = this.formBuilder.group({
      payment: ['Debit Card'],
    });
  }

  getOrderTotal() {
    this.orderTotal = 0;

    for (let item of this.itemsToOrder) {
      if (item.cartId) {
        this.isCartItem = true;
      }
      this.orderTotal =
        this.orderTotal + item.product.productPrice * item.quantity;
    }
  }

  updateQuantity(event: any, itemid: number) {
    this.itemsToOrder[itemid - 1].quantity = +event.target.value;

    this.getOrderTotal();
  }

  placeOrder() {
    let userId = this.userDetails.userId;

    for (let item of this.itemsToOrder) {
      let cartId = item.cartId;
      let quantity = item.quantity;
      let product = new Product(
        item.product.productId,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      );
      let amount = item.product.productPrice * quantity;
      let order = new Order(
        null,
        product,
        userId,
        quantity,
        amount,
        this.selectedPaymentMethod,
        null,
        null,
        null
      );

      this.service.placeOrder(order, cartId);
    }
  }

  cancel() {
    if (this.itemsToOrder.length == 0) {
      this.toast.showToastMessage(
        'Please choose item to order from homepage or from your cart',
        ToastMessages.danger
      );
      setTimeout(() => {
        this.toast.showToast$.next(false);
      }, 3000);
      this.router.navigate(['home']);
    } else {
      if (this.isCartItem) {
        this.router.navigate(['cart']);
      } else {
        let product = this.itemsToOrder[0].product;
        let pathVariable = product.productName
          .replaceAll(' ', '_')
          .concat('-', product.productId.toString());

        this.router.navigate(['home/' + pathVariable]);
      }
    }
  }

  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe();
    this.eventSubscription.unsubscribe();
  }
}
