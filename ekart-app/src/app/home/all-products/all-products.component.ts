import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { onGetProducts, onSelectProduct } from '../store/home.action';
import { Product } from '../product.model';
import { Subscription } from 'rxjs';
import { onGetCart } from 'src/app/cart/store/cart.action';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;

  constructor(
    private store: Store<{ home: { products: Product[] } }>,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.store.dispatch(onGetProducts({ searchParam: '' }));

    this.subscription = this.store.select('home').subscribe((data) => {
      this.products = data.products;
    });
  }
  viewProduct(product: Product) {
    let pathVariable = product.productName
      .replaceAll(' ', '_')
      .concat('-', product.productId.toString());

    this.router.navigate([pathVariable], {
      relativeTo: this.route,
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
