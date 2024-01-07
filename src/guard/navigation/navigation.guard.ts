import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app/app.state';
import { map } from 'rxjs';
import * as fromAuth from '../../modules/auth/state/auth/auth.selector';

export const navigationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store<AppState>);
  return store.select(fromAuth.selectToken).pipe(
    map((token) => {
      if (token) {
        return router.createUrlTree(['/']);
      }
      return true;
    })
  );
};
