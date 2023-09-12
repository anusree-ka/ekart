import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/cart/cart.model';
import { onAddItemToCart } from 'src/app/cart/store/cart.action';
import { onGetProductDetailsById } from '../store/home.action';
import { PlaceOrderService } from 'src/app/order/place-order/place-order.service';
import { ItemsToOrder } from 'src/app/order/place-order/items-to-order.model';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnInit, OnDestroy {
  product: Product;
  subscription: Subscription;
  quantity = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<{ home: { selectedProduct: Product } }>,
    private placeOrderService: PlaceOrderService
  ) {}

  updateQuantity(event: any) {
    this.quantity = event.target.value;
  }
  addToCart() {
    let userId = window.sessionStorage.getItem('USERID');

    if (!userId) {
      this.router.navigate(['login']);
    } else {
      let cart = new Cart(
        null,
        this.product,
        +window.sessionStorage.getItem('USERID'),
        this.quantity
      );
      this.store.dispatch(onAddItemToCart({ cart: cart }));
    }
  }

  order() {
    let itemsToOrder = new ItemsToOrder(1, this.product, this.quantity, null);
    this.placeOrderService.addItemsToOrder([itemsToOrder]);
    this.router.navigate(['placeOrder']);
  }
  ngOnInit(): void {
    let productId = +this.route.snapshot.url[0].path.split('-')[1];

    this.store.dispatch(onGetProductDetailsById({ productId: productId }));

    this.subscription = this.store.select('home').subscribe((data) => {
      this.product = data.selectedProduct;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
