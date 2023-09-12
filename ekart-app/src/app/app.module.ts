import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { homeReducer } from './home/store/home.reducer';
import { HomeEffects } from './home/store/home.effects';
import { cartReducer } from './cart/store/cart.reducer';
import { CartEffects } from './cart/store/cart.effects';
import { ViewProductComponent } from './home/view-product/view-product.component';
import { AllProductsComponent } from './home/all-products/all-products.component';
import { PlaceOrderComponent } from './order/place-order/place-order.component';
import { profileReducer } from './profile/store/profile.reducer';
import { ProfileEffects } from './profile/store/profile.effects';
import { ToastComponent } from './common/toast/toast.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { Oauth2AuthorizeComponent } from './auth/oauth2-authorize/oauth2-authorize.component';
import { authReducer } from './auth/store/auth.reducer';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    CartComponent,
    OrderComponent,
    ProfileComponent,
    ViewProductComponent,
    AllProductsComponent,
    PlaceOrderComponent,
    ToastComponent,
    Oauth2AuthorizeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(
      {
        home: homeReducer,
        cart: cartReducer,
        profile: profileReducer,
        auth: authReducer,
      },
      {}
    ),
    EffectsModule.forRoot([HomeEffects, CartEffects, ProfileEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
