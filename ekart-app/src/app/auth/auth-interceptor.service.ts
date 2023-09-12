import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = new HttpHeaders();

    let authorization = sessionStorage.getItem('Authorization');
    if (authorization) {
      headers = headers.append('Authorization', authorization);
    }

    headers = headers.append('X-Requested-With', 'XMLHttpRequest');
    const xhr = req.clone({
      headers: headers,
      withCredentials: true,
    });
    return next.handle(xhr).pipe(
      tap((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            return;
          }
        }
      })
    );
  }
}
