import { NgModule, NgModuleFactoryLoader } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { UniversalLocalizeModuleMapNgFactoryLoader } from './universal-localize-module-map-ngfactory-loader';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule
  ],
  providers: [
    // Add universal-only providers here
    {
      provide: NgModuleFactoryLoader,
      useClass: UniversalLocalizeModuleMapNgFactoryLoader
    }
  ],
  bootstrap: [ AppComponent ],
})
export class AppServerModule {}

