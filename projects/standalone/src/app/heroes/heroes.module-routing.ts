import { Routes } from "@angular/router";
import { HeroesComponent } from "./heroes.component";

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HeroesComponent },
  { path: "heroesbis" , component: HeroesComponent, loadChildren: () => import('../heroes2/heroes.module-routing').then(m => m.routes) }
];
