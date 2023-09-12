import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  onGetUserDetails,
  onGetUserDetailsFail,
  populateUserDetails,
} from './profile.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { AppConstants } from 'src/app/common/constants/app-constants.model';
import { UserDetails } from 'src/app/auth/user-details.model';
import {
  ToastMessages,
  ToastService,
} from 'src/app/common/toast/toast.service';

@Injectable()
export class ProfileEffects {
  getUserDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(onGetUserDetails),
      switchMap(() => {
        return this.http
          .get<UserDetails>(
            AppConstants.BASE_URL +
              'user/' +
              sessionStorage.getItem('USERID') +
              '/profile'
          )
          .pipe(
            map((response) => {
              return populateUserDetails({ userDetails: response });
            }),
            catchError(() => {
              this.toast.showToastMessage(
                'Unable to load user details',
                ToastMessages.danger
              );
              setTimeout(() => {
                this.toast.showToast$.next(false);
              }, 3000);
              return of(onGetUserDetailsFail());
            })
          );
      })
    )
  );

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private toast: ToastService
  ) {}
}
