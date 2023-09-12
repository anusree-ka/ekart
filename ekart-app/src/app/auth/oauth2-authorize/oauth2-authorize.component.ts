import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TokenDetails } from './token-details.model';
import { AuthService } from '../auth.service';
import { AppConstants } from 'src/app/common/constants/app-constants.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-oauth2-authorize',
  templateUrl: './oauth2-authorize.component.html',
  styleUrls: ['./oauth2-authorize.component.css'],
})
export class Oauth2AuthorizeComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private store: Store<{ auth: { codeVerifier: string } }>,
    private service: AuthService
  ) {}

  ngOnInit(): void {
    let code = this.route.snapshot.queryParamMap.get('code');

    this.getAccessToken(code);
  }

  getAccessToken(code: string) {
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    let codeVerifier;

    this.subscription = this.store.select('auth').subscribe((data) => {
      codeVerifier = data.codeVerifier;
    });

    codeVerifier = AppConstants.CODE_VERIFIER;

    let body = new HttpParams()
      .set('grant_type', AppConstants.GRANT_TYPE)
      .set('code', code)
      .set('redirect_uri', AppConstants.REDIRECT_URI)
      .set('code_verifier', codeVerifier)
      .set('client_id', AppConstants.CLIENT_ID);

    this.http
      .post<TokenDetails>(AppConstants.TOKEN_URL, body, {
        headers: headers,
      })
      .subscribe((data) => {
        const expiryDate = Date.now() + data.expires_in * 1000;
        sessionStorage.setItem('tokenExp', expiryDate.toString());
        sessionStorage.setItem('Authorization', 'Bearer ' + data.access_token);
        sessionStorage.setItem('id_token', data.id_token);
        this.getUserId(data.access_token);
      });
  }

  getUserId(accessToken: string) {
    let headers = new HttpHeaders().set('Authorization', accessToken);
    this.http
      .get<number>(AppConstants.BASE_URL + 'user', { headers: headers })
      .subscribe((data) => {
        sessionStorage.setItem('USERID', data.toString());
        this.service.isLoggedIn.next(true);
        this.service.callCartAndProfileStore();
        this.router.navigate(['home']);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
