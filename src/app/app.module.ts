import { NgModule }       from '@angular/core';
import { BrowserModule, BrowserTransferStateModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule, HttpClient }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
// import { HeroesComponent }      from './heroes/heroes.component';
import { HeroSearchComponent }  from './hero-search/hero-search.component';
import { HeroService }          from './hero.service';
import { MessageService }       from './message.service';
import { MessagesComponent }    from './messages/messages.component';

import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

import { TransferHttpCacheModule } from '@nguniversal/common';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

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
    BrowserModule.withServerTransition({ appId: 'tour-of-heroes' }),
    TransferHttpCacheModule,
    BrowserTransferStateModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false, passThruUnknownUrl: true }
    ),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [/* PLATFORM_ID, */HttpClient]
      }
    }),
    StoreModule.forRoot({
      router: routerReducer,
    }, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot()
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    // HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent
  ],
  providers: [ HeroService, MessageService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
