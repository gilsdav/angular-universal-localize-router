import {NgModule} from '@angular/core';
import {RouterModule, Routes, provideRouter, withDisabledInitialNavigation} from '@angular/router';
import {Location} from '@angular/common';

import {DashboardComponent} from './dashboard/dashboard.component';
// import { HeroesComponent }      from './heroes/heroes.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';

import {LocalizeParser, LocalizeRouterModule, LocalizeRouterSettings, ManualParserLoader} from '@gilsdav/ngx-translate-router';
// import { LocalizeRouterHttpLoader } from '@gilsdav/ngx-translate-router-http-loader';
import {TranslateService} from '@ngx-translate/core';

/* export function createTranslateLoader(translate: TranslateService, location: Location, settings: LocalizeRouterSettings, http: HttpClient) {
  return new LocalizeRouterHttpLoader(translate, location, settings, http)
} */

export function createTranslateLoader(translate: TranslateService, location: Location, settings: LocalizeRouterSettings) {
  return new ManualParserLoader(translate, location, settings, ['en', 'fr'], 'ROUTES.');
}

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail/:id', component: HeroDetailComponent},
  // { path: 'heroes', loadChildren: './heroes/heroes.module#HeroesModule' }
  {path: 'heroes', loadChildren: () => import('./heroes/heroes.module').then(mod => mod.HeroesModule)},
  {path: 'heroesbis', loadChildren: () => import('./heroes2/heroes.module-routing').then(mod => mod.routes)}
];

@NgModule({
  imports: [
    // RouterModule.forRoot(routes, { initialNavigation: 'disabled' }),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: (createTranslateLoader),
        deps: [TranslateService, Location, LocalizeRouterSettings/*, HttpClient*/]
      },
      initialNavigation: true
    })
  ],
  providers: [provideRouter(routes, withDisabledInitialNavigation())],
  exports: [RouterModule, LocalizeRouterModule]
})
export class AppRoutingModule {
}
