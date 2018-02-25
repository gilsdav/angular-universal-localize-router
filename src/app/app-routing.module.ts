import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Location }             from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { DashboardComponent }   from './dashboard/dashboard.component';
// import { HeroesComponent }      from './heroes/heroes.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';

import { LocalizeRouterModule, LocalizeRouterSettings, LocalizeParser, ManualParserLoader } from 'localize-router';
// import { LocalizeRouterHttpLoader } from 'localize-router-http-loader';
import { TranslateService } from '@ngx-translate/core';

/* export function createTranslateLoader(translate: TranslateService, location: Location, settings: LocalizeRouterSettings, http: HttpClient) {
  return new LocalizeRouterHttpLoader(translate, location, settings, http)
} */

export function createTranslateLoader(translate: TranslateService, location: Location, settings: LocalizeRouterSettings,) {
  return new ManualParserLoader(translate, location, settings, ['en', 'fr'], 'ROUTES.');
}

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', loadChildren: './heroes/heroes.module#HeroesModule' }
];

@NgModule({
  imports: [
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: (createTranslateLoader),
        deps: [TranslateService, Location, LocalizeRouterSettings/*, HttpClient*/]
      }
    }),
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule, LocalizeRouterModule ]
})
export class AppRoutingModule {}
