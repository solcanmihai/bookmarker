import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryService } from './in-memory-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // provide HttpClient + interceptors from DI
    provideHttpClient(withInterceptorsFromDi()),
    // wire up the in-memory server
    importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(InMemoryService, {
        // dataEncapsulation: false,
        passThruUnknownUrl: true,
        delay: 500,
      }),
    ),
  ],
};
