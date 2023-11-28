import {APP_ID, Inject, NgModule, PLATFORM_ID} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClient, provideHttpClient, withFetch} from '@angular/common/http';

import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
// import { HeroesComponent }      from './heroes/heroes.component';
import {HeroSearchComponent} from './hero-search/hero-search.component';
import {HeroService} from './hero.service';
import {MessageService} from './message.service';
import {MessagesComponent} from './messages/messages.component';
import {isPlatformBrowser} from '@angular/common';

import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {environment} from '../environments/environment';

// import { UniversalTranslateLoader } from '@ngx-universal/translate-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `${environment.locales}assets/locales/`, '.json');
}

/*export function createTranslateLoader(platformId: any, http: HttpClient): TranslateLoader {
  const browserLoader = new TranslateHttpLoader(http, './assets/locales/', '.json');

  return new UniversalTranslateLoader(platformId, browserLoader, 'browser/assets/locales', '.json');
}*/

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false, passThruUnknownUrl: true}
    ),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [/* PLATFORM_ID, */HttpClient]
      }
    })
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    // HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent
  ],
  providers: [HeroService, MessageService, provideClientHydration(), provideHttpClient(withFetch())],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    // tslint:disable-next-line:ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
    console.log('locales', environment.locales);
  }
}
