import { Injectable } from '@angular/core';
import { UserDetails } from '../auth/user-details.model';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../common/constants/app-constants.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  updateUserDetails(userId: number, userDetails: UserDetails) {
    return this.http.put(
      AppConstants.BASE_URL + 'user/' + userId + '/profile',
      userDetails
    );
  }
}
