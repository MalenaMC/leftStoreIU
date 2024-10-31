import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { authRoutes } from './pages/auth/auth.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideRouter(authRoutes),
    provideClientHydration(),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    provideClientHydration(
      withHttpTransferCacheOptions({
				includePostRequests: true,
			}),
    ),
    provideHttpClient(withFetch())
  ]
};
