/// <reference types="@types/google.accounts" />
// declare let google: any;

import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './signup-request.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements AfterViewInit, OnInit {
  signupForm: FormGroup;
  isLogin = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      emailId: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngAfterViewInit() {
    // google.accounts.id.initialize({
    //   client_id:
    //     '376855913374-se0ntv5ej0jl4854slsgcdlq2qrbb7qg.apps.googleusercontent.com',
    //   callback: ({ credential }) => {
    //     this.ngZone.run(() => {
    //       sessionStorage.setItem('Authorization', credential);
    //       this.onLogin();
    //     });
    //   },
    // });
    // google.accounts.id.prompt();
  }

  authorize() {
    this.authService.authorize();
  }

  onSignup() {
    let user = new User(
      this.signupForm.value.emailId,
      this.signupForm.value.password
    );

    this.authService.signup(user);
  }

  // onLogin() {
  //   this.authService.login();
  // }
}
