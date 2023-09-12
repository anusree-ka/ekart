import { createAction, props } from '@ngrx/store';
import { UserDetails } from 'src/app/auth/user-details.model';

export const onGetUserDetails = createAction('ON_GET_USER_DETAILS');
export const populateUserDetails = createAction(
  'POPULATE_USER_DETAILS',
  props<{ userDetails: UserDetails }>()
);
export const onGetUserDetailsFail = createAction('ON_GET_USER_DETAILS_FAIL');
