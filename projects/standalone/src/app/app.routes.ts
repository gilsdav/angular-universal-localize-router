import { Routes } from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';

export const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail/:id', component: HeroDetailComponent},
  {path: 'heroes', loadChildren: () => import('./heroes/heroes.module-routing').then(mod => mod.routes)},
  {path: 'heroesbis', loadChildren: () => import('./heroes2/heroes.module-routing').then(mod => mod.routes)}
];
