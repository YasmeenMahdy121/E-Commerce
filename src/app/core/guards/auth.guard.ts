import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let currentPath = state.url.split('/')[state.url.split('/').length-1]
  let authService = inject(AuthService)
  let router = inject(Router)
  if(authService.isLoggedIn.getValue().userName && currentPath !== 'login' && currentPath !== 'registration'){
    return true;
  }
  else if(authService.isLoggedIn.getValue().userName && (currentPath === 'login' || currentPath === 'registration')){
    router.navigate(['/store/product-list'])
    return false
  }
  else if(!authService.isLoggedIn.getValue().userName && (currentPath === 'login' || currentPath === 'registration')){
    return true
  }
  router.navigate(['/auth/login'])
  return false
};
