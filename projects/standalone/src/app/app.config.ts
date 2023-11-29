import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { Location } from '@angular/common';
import { provideRouter, withDisabledInitialNavigation } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalizeParser, LocalizeRouterSettings, ManualParserLoader, withLocalizeRouter } from '@gilsdav/ngx-translate-router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `${environment.locales}assets/locales/`, '.json');
}

export function createTranslateRouteLoader(translate: TranslateService, location: Location, settings: LocalizeRouterSettings) {
  return new ManualParserLoader(translate, location, settings, ['en', 'fr'], 'ROUTES.');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    importProvidersFrom(TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [/* PLATFORM_ID, */HttpClient]
      }
    })),
    provideRouter(routes, withDisabledInitialNavigation(), withLocalizeRouter(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: (createTranslateRouteLoader),
        deps: [TranslateService, Location, LocalizeRouterSettings/*, HttpClient*/]
      },
      initialNavigation: true
    })),
    provideClientHydration()
  ]
};
