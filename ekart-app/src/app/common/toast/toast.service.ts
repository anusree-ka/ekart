import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const ToastMessages = {
  success: 'text-bg-success',
  danger: 'text-bg-danger',
};

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  showToast$ = new BehaviorSubject<boolean>(false);
  toastMessage$ = new BehaviorSubject<string>('');
  messageType$ = new BehaviorSubject<string>('');

  showToastMessage(message: string, messageType: string) {
    this.toastMessage$.next(message);
    this.messageType$.next(messageType);
    this.showToast$.next(true);
  }
  constructor() {}
}
