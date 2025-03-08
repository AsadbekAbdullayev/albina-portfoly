import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DITokens } from './utils/di.tokens';
import { environment } from '../environments/environment';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: null,
      },
    }),
    provideRouter(routes),
    {
      provide: DITokens.API_ENDPOINT,
      useValue: environment.apiUrl,
    },
  ],
};
