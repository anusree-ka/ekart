import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './signup-request.model';
import { UserDetails } from './user-details.model';
import { AppConstants } from '../common/constants/app-constants.model';
import { ToastMessages, ToastService } from '../common/toast/toast.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { onGetUserDetails } from '../profile/store/profile.action';
import { onGetCart } from '../cart/store/cart.action';
import { setCodeVerifier } from './store/auth.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = new BehaviorSubject<boolean>(false);

  // login() {
  //   this.http
  //     .get<number>(AppConstants.BASE_URL + 'authenticate', {
  //       observe: 'response',
  //     })
  //     .subscribe({
  //       next: (response) => {
  //         sessionStorage.setItem(
  //           'USERID',
  //           response ? response.body.toString() : ''
  //         );
  //         sessionStorage.setItem('tokenExp', response.headers.get('tokenExp'));

  //         this.isLoggedIn.next(true);

  //         this.callCartAndProfileStore();
  //         this.router.navigate(['home']);
  //       },
  //       error: () => {
  //         this.toast.showToastMessage('Unable to login', ToastMessages.danger);
  //         setTimeout(() => {
  //           this.toast.showToast$.next(false);
  //         }, 3000);
  //       },
  //     });
  // }

  signup(user: User) {
    this.http.post<number>(AppConstants.BASE_URL + 'signup', user).subscribe({
      next: () => {
        this.toast.showToastMessage(
          'Signed up successfully!! Please login again!!',
          ToastMessages.success
        );
        setTimeout(() => {
          this.toast.showToast$.next(false);
        }, 3000);
      },
      error: () => {
        this.toast.showToastMessage('Unable to signup', ToastMessages.danger);
        setTimeout(() => {
          this.toast.showToast$.next(false);
        }, 3000);
      },
    });
  }

  callCartAndProfileStore() {
    this.store.dispatch(onGetUserDetails());
    this.store.dispatch(onGetCart());
  }

  authorize() {
    const codeVerifier = this.strRandom(128);
    this.store.dispatch(setCodeVerifier({ codeVerifier: codeVerifier }));

    // create code challenge

    let url = AppConstants.OAUTH_SERVER_URL;

    window.location.href = url;

    // this.http
    //   .get('http://localhost:8200/oauth2/authorize', {
    //     params: {
    //       response_type: 'code',
    //       client_id: 'client',
    //       redirect_uri: 'http://localhost:4200/oauth2/authorize',
    //       scope: 'openid read',
    //       code_challenge_method: 'S256',
    //       code_challenge: codeChallenge,
    //     },
    //   })
    //   .subscribe(() => {
    //     console.log('done');
    //   });
  }

  private strRandom(length: number) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  logout() {
    let idToken = sessionStorage.getItem('id_token');

    // let url =
    //   'http://localhost:8200/logout?id_token_hint=' +
    //   idToken +
    //   '&client_id=' +
    //   AppConstants.CLIENT_ID +
    //   '&post_logout_redirect_uri=http://localhost:4200/authenticate';
    // window.location.href = url;

    this.http
      .get(
        'http://localhost:8200/logout?id_token_hint=' +
          idToken +
          '&client_id=' +
          AppConstants.CLIENT_ID +
          '&post_logout_redirect_uri=http://localhost:4200/authenticate'
      )
      .subscribe(() => {
        console.log('loggedout');
      });
  }

  constructor(
    private http: HttpClient,
    private toast: ToastService,
    private router: Router,
    private store: Store
  ) {}
}
