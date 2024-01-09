import { AppState } from './../app/state/app/app.state';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, exhaustMap, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { ErrorResult } from '../data/shared/error.result';
import {
  selectToken,
  setErrorMessage,
} from '../app/state/shared/shared.action';
import { environment } from '../environments/environment';
// ... other imports ...

@Injectable({
  providedIn: 'root',
})
export class JwtTokenInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(selectToken).pipe(
      take(1),
      exhaustMap((token) => {
        if (!token) {
          const headers: HttpHeaders = request.headers.set(
            'app-id',
            '6597c0d018bdf61802c5fdf4'
          );
          const clonedRequest = request.clone({
            headers,
            url: `${environment.apiUrl}${request.url}` || request.url,
          });
          return next.handle(clonedRequest);
        }

        const headers: HttpHeaders = request.headers
          .set('Authorization', `Bearer ${token}`)
          .set('app-id', '6597c0d018bdf61802c5fdf4');
        const clonedRequest = request.clone({
          headers,
          url: `${environment.apiUrl}${request.url}` || request.url,
        });
        return next.handle(clonedRequest);
      }),
      catchError((error) => {
        this.store.dispatch(
          setErrorMessage({
            message: error?.error?.error,
            isSuccessful: false,
          })
        );
        return EMPTY;
      })
    );
  }
}
