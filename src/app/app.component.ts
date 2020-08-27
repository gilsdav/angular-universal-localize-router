import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store, createFeatureSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';

  constructor(translate: TranslateService, store: Store) {
    translate.setDefaultLang('en');
    // translate.use('en');

    const getRouterState = createFeatureSelector<RouterReducerState<RouterStateSnapshot>>('router');
    store.select(getRouterState).subscribe(response => console.log(response));

  }

}
