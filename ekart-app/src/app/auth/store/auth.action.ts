import { createAction, props } from '@ngrx/store';

export const setCodeVerifier = createAction(
  'SET_CODE_VERIFIER',
  props<{ codeVerifier: string }>()
);
