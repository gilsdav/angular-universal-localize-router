import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Location }             from '@angular/common';

import { DashboardComponent }   from './dashboard/dashboard.component';
// import { HeroesComponent }      from './heroes/heroes.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';

import { LocalizeRouterModule, LocalizeRouterSettings, LocalizeParser, ManualParserLoader } from '@gilsdav/ngx-translate-router';
// import { LocalizeRouterHttpLoader } from '@gilsdav/ngx-translate-router-http-loader';
import { TranslateService } from '@ngx-translate/core';

/* export function createTranslateLoader(translate: TranslateService, location: Location, settings: LocalizeRouterSettings, http: HttpClient) {
  return new LocalizeRouterHttpLoader(translate, location, settings, http)
} */

export function createTranslateLoader(translate: TranslateService, location: Location, settings: LocalizeRouterSettings) {
  return new ManualParserLoader(translate, location, settings, ['en', 'fr'], 'ROUTES.');
}

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  // { path: 'heroes', loadChildren: './heroes/heroes.module#HeroesModule' }
  { path: 'heroes', loadChildren: () => import('./heroes/heroes.module').then(mod => mod.HeroesModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'disabled', relativeLinkResolution: 'legacy' }),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: (createTranslateLoader),
        deps: [TranslateService, Location, LocalizeRouterSettings/*, HttpClient*/]
      },
      initialNavigation: true
    })
  ],
  exports: [ RouterModule, LocalizeRouterModule ]
})
export class AppRoutingModule {}
