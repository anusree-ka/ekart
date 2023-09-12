import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserDetails } from '../auth/user-details.model';
import { Subscription } from 'rxjs';
import { ProfileService } from './profile.service';
import { onGetUserDetails } from './store/profile.action';
import { ToastMessages, ToastService } from '../common/toast/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  subscription: Subscription;
  userId = +sessionStorage.getItem('USERID');
  constructor(
    private profileService: ProfileService,
    private store: Store<{ profile: { userDetails: UserDetails } }>,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(onGetUserDetails());
    this.subscription = this.store.select('profile').subscribe((data) => {
      //this.userDetails = data;
      this.initializeForm(data.userDetails);
    });
  }

  initializeForm(userDetails: UserDetails) {
    let username = '';
    let emailId = '';
    let address = '';
    let contactNo = null;
    if (userDetails) {
      username = userDetails.username;
      emailId = userDetails.emailId;
      address = userDetails.address;
      contactNo = userDetails.contactNo;
    }
    this.userForm = new FormGroup({
      username: new FormControl(username, Validators.required),
      emailId: new FormControl({ value: emailId, disabled: true }, [
        Validators.required,
        Validators.email,
      ]),
      address: new FormControl(address, Validators.required),
      contactNo: new FormControl(contactNo, [
        Validators.required,
        Validators.pattern('[0-9]{10}'),
      ]),
    });
  }

  updateUserDetails() {
    let userDetails = new UserDetails(
      this.userId,
      null,
      null,
      this.userForm.value.username,
      this.userForm.value.address,
      this.userForm.value.contactNo
    );
    this.profileService.updateUserDetails(this.userId, userDetails).subscribe({
      next: () => {
        this.toast.showToastMessage(
          'Updated user details successfully',
          ToastMessages.success
        );
        setTimeout(() => {
          this.toast.showToast$.next(false);
        }, 3000);

        this.store.dispatch(onGetUserDetails());
      },
      error: () => {
        this.toast.showToastMessage(
          'Unable to update user details',
          ToastMessages.danger
        );
        setTimeout(() => {
          this.toast.showToast$.next(false);
        }, 3000);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
