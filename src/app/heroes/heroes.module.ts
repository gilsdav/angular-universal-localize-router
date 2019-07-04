import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesComponent } from './heroes.component';
import { HeroesRoutingModule } from './heroes.module-routing';
import { TranslateModule } from '@ngx-translate/core';

import { translateModule } from '@gilsdav/ngx-translate-router';

@NgModule({
    declarations: [
        HeroesComponent
    ],
    imports: [
        CommonModule,
        HeroesRoutingModule,
        TranslateModule.forChild()
    ],
    exports: [],
    providers: [],
})
export class HeroesModule {}

// export const HeroesModuleTranslated = translateModule(HeroesModule) as NgModuleFactory<any>;
