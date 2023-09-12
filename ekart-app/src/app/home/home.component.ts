import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from './product.model';
import { Subscription } from 'rxjs';
import { onGetProducts, onSelectProduct } from './store/home.action';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '../cart/cart.model';
import { onGetCart } from '../cart/store/cart.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {}
