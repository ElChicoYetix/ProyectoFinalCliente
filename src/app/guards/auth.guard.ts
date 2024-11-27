import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthclassService } from '../services/authclass.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthclassService);
  const router = inject(Router);
  const isAuth = authService.isLoggedIn();

  if(isAuth) {
    return true;
  } else {
    //router.navigateByUrl('/account');
    return false;
  }
};
