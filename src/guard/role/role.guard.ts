import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../../services/utils/jwt.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);
  const user = jwtService.getUser();
  if (user == null) {
    return router.parseUrl('/login');
  }
  const IsAdmin: boolean = user.role === 'admin';
  if (IsAdmin) {
    return true;
  } else {
    return router.navigateByUrl('/');
  }
};
