import { Routes } from "@angular/router";
import { HeroesComponentBis } from "./heroes.component";

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HeroesComponentBis }
];
