import { ApplicationConfig, isDevMode } from '@angular/core';
import {
  TitleStrategy,
  provideRouter,
  withInMemoryScrolling,
} from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { TemplatePageTitleStrategy } from '../extension/title.strategy';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { JwtTokenInterceptor } from '../extension/http.interceptor';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { appReducer } from './state/app/app.reducer';
import { provideEffects } from '@ngrx/effects';
import { appEffects } from './state/app/app.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true },
    provideToastr({
      maxOpened: 8,
      autoDismiss: true,
      timeOut: 3000,
      positionClass: 'toast-top-center',
    }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      })
    ),
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy,
    },
    provideStore(appReducer),
    provideEffects(appEffects),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
    }),
  ],
};
