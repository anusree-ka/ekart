import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Cart } from './cart/cart.model';
import { onGetCart, populateCart } from './cart/store/cart.action';
import { UserDetails } from './auth/user-details.model';
import {
  onGetUserDetails,
  populateUserDetails,
} from './profile/store/profile.action';
import { onGetProducts } from './home/store/home.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  isLoggedIn = false;
  noOfItemsInCart = 0;
  username = '';
  cartStoreSub: Subscription;
  profileStoreSub: Subscription;

  constructor(
    public authService: AuthService,
    private router: Router,
    private cartStore: Store<{ cart: { carts: Cart[] } }>,
    private profileStore: Store<{ profile: { userDetails: UserDetails } }>,
    private homeStore: Store
  ) {}

  ngOnInit(): void {
    this.autoLogin();
    this.autoLogout();

    this.subscription = this.authService.isLoggedIn.subscribe((data) => {
      this.isLoggedIn = data;
    });

    this.profileStoreSub = this.profileStore
      .select('profile')
      .subscribe((data) => {
        this.username = data.userDetails ? data.userDetails.username : '';
      });

    this.cartStoreSub = this.cartStore.select('cart').subscribe((data) => {
      this.noOfItemsInCart = data.carts.length;
    });
  }

  autoLogin() {
    if (sessionStorage.getItem('USERID')) {
      this.authService.isLoggedIn.next(true);
      this.authService.callCartAndProfileStore();
    }
  }

  autoLogout() {
    if (sessionStorage.getItem('tokenExp')) {
      if (+sessionStorage.getItem('tokenExp') < new Date().getTime()) {
        window.sessionStorage.clear();
        this.cartStore.dispatch(populateCart({ carts: [] }));
        this.profileStore.dispatch(populateUserDetails({ userDetails: null }));
        this.authService.isLoggedIn.next(false);
        this.router.navigate(['authenticate']);
      }
    }
  }

  searchProducts(event: any) {
    this.homeStore.dispatch(onGetProducts({ searchParam: event.target.value }));
  }

  logout() {
    this.authService.logout();
    window.sessionStorage.clear();
    this.cartStore.dispatch(populateCart({ carts: [] }));
    this.profileStore.dispatch(populateUserDetails({ userDetails: null }));
    this.authService.isLoggedIn.next(false);
    this.router.navigate(['authenticate']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.cartStoreSub.unsubscribe();
    this.profileStoreSub.unsubscribe();
  }
}
