import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let userId = sessionStorage.getItem('USERID');
  if (!userId) {
    router.navigate(['authenticate']);
  }

  return userId ? true : false;
};
