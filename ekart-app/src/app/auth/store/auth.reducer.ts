import { createReducer, on } from '@ngrx/store';
import { setCodeVerifier } from './auth.action';

export const initialState = {
  codeVerifier: '',
};

export const authReducer = createReducer(
  initialState,
  on(setCodeVerifier, (state, action) => {
    return {
      ...state,
      carts: action.codeVerifier,
    };
  })
);
