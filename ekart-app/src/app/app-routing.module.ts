import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { AuthComponent } from './auth/auth.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './auth/auth.guard';
import { ViewProductComponent } from './home/view-product/view-product.component';
import { AllProductsComponent } from './home/all-products/all-products.component';
import { PlaceOrderComponent } from './order/place-order/place-order.component';
import { Oauth2AuthorizeComponent } from './auth/oauth2-authorize/oauth2-authorize.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: AllProductsComponent },
      { path: ':name', component: ViewProductComponent },
    ],
  },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'orders', component: OrderComponent, canActivate: [authGuard] },
  {
    path: 'placeOrder',
    component: PlaceOrderComponent,
    canActivate: [authGuard],
  },
  { path: 'authenticate', component: AuthComponent },
  { path: 'oauth2/authorize', component: Oauth2AuthorizeComponent },
  { path: 'signup', component: AuthComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
