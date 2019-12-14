import { enableProdMode } from '@angular/core';
export { AppServerModule } from './app/app.server.module';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}


export { renderModule, renderModuleFactory } from '@angular/platform-server';