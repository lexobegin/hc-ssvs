import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

//import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';

export const AuthGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isAuthenticated()) {
    return true;
  }else{
    return router.navigate(['/login']);
  }

    /*return authService.isAuthenticated().pipe(
      map(isAuthenticated => {
        console.log("¿Está autenticado?", isAuthenticated);
        if (isAuthenticated) {
          return true;
        } else {
          router.navigate(['/login']);
          return false;
        }
      })
    );*/


};
