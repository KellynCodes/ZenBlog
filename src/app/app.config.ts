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
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { JwtTokenInterceptor } from '../extension/http.interceptor';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { appReducer } from './state/app/app.reducer';
import { provideEffects } from '@ngrx/effects';
import { appEffects } from './state/app/app.effects';
import { provideClientHydration } from '@angular/platform-browser';
import { LIGHTBOX_CONFIG, LightboxConfig } from 'ng-gallery/lightbox';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true },
    provideToastr({
      maxOpened: 8,
      autoDismiss: true,
      timeOut: 3000,
      positionClass: 'toast-top-right',
    }),
    {
      provide: LIGHTBOX_CONFIG,
      useValue: {
        keyboardShortcuts: false,
        exitAnimationTime: 1000,
      } as LightboxConfig,
    },
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
    provideClientHydration(),
  ],
};
