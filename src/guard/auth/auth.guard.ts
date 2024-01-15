import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AppState } from '../../app/state/app/app.state';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store<AppState>);
  return store.select('fromAuth.selectToken').pipe(
    map((token) => {
      if (!token) {
        return router.createUrlTree(['/auth/login']);
      }
      return true;
    })
  );
};
