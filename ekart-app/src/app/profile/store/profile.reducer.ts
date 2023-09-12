import { createReducer, on } from '@ngrx/store';
import { populateUserDetails } from './profile.action';

export const initialState = {
  userDetails: null,
};

export const profileReducer = createReducer(
  initialState,
  on(populateUserDetails, (state, action) => {
    return {
      ...state,
      userDetails: action.userDetails,
    };
  })
);
