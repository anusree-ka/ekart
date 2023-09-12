import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { AppConstants } from '../common/constants/app-constants.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  viewOrders() {
    return this.http.get<Order[]>(
      AppConstants.BASE_URL + 'orders/' + sessionStorage.getItem('USERID'),
      { observe: 'response' }
    );
  }
}
