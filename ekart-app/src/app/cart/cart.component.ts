import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart } from './cart.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  onDeleteItemFromCart,
  onGetCart,
  onModifyCart,
} from './store/cart.action';
import { PlaceOrderService } from '../order/place-order/place-order.service';
import { ItemsToOrder } from '../order/place-order/items-to-order.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  carts: Cart[];
  subscription: Subscription;
  subtotal: number;
  constructor(
    private router: Router,
    private store: Store<{ cart: { carts: Cart[] } }>,
    private placeOrderService: PlaceOrderService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(onGetCart());
    this.subscription = this.store.select('cart').subscribe((data) => {
      this.carts = data.carts;
      this.subtotal = 0;
      this.findSubtotal();
    });
  }

  findSubtotal() {
    for (let cart of this.carts) {
      this.subtotal = this.subtotal + cart.product.productPrice * cart.quantity;
    }
  }

  updateQuantity(event: any, cartId: number) {
    this.store.dispatch(
      onModifyCart({ cartId: cartId, quantity: event.target.value })
    );
  }

  deleteItemFromCart(cartId: number) {
    this.store.dispatch(onDeleteItemFromCart({ cartId: cartId }));
  }

  order() {
    let items: ItemsToOrder[] = [];
    let itemId = 0;
    for (let cartItem of this.carts) {
      let item = new ItemsToOrder(
        itemId++,
        cartItem.product,
        cartItem.quantity,
        cartItem.cartId
      );
      items.push(item);
    }

    this.placeOrderService.addItemsToOrder(items);
    this.router.navigate(['placeOrder']);
  }

  goToProducts() {
    this.router.navigate(['home']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
