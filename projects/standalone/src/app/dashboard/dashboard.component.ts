import {LocalizeRouterPipe, LocalizeRouterService} from '@gilsdav/ngx-translate-router';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { TranslateModule } from '@ngx-translate/core';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ],
  standalone: true,
  imports: [
    TranslateModule,
    NgForOf,
    RouterLink,
    LocalizeRouterPipe
  ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private localizeService: LocalizeRouterService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

  switchLanguage(lang: string) {
    this.localizeService.changeLanguage(lang);
  }

}
