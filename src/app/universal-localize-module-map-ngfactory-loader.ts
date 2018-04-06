
/**
 * Inspired by :
 * - https://github.com/angular/universal/blob/1916fec006191d63bb8b923f04179f056e39dc60/modules/module-map-ngfactory-loader/src/module-map-ngfactory-loader.ts
 * - https://github.com/Greentube/localize-router/blob/master/src/localize-router-config-loader.ts
 */

import {
  Injectable,
  NgModuleFactoryLoader,
  InjectionToken,
  NgModuleFactory,
  Inject,
  Type,
  Compiler,
  Injector,
  forwardRef
} from '@angular/core';
import { ModuleMap } from '@nguniversal/module-map-ngfactory-loader/typings/src/module-map';
import { MODULE_MAP } from '@nguniversal/module-map-ngfactory-loader';
import { ROUTES } from '@angular/router';
import { LocalizeParser } from 'localize-router';

/**
 * NgModuleFactoryLoader which does not lazy load
 */
@Injectable()
export class UniversalLocalizeModuleMapNgFactoryLoader implements NgModuleFactoryLoader {
  constructor(@Inject(forwardRef(() => LocalizeParser)) private localize: LocalizeParser,
    private compiler: Compiler, @Inject(MODULE_MAP) private moduleMap: ModuleMap) { }

  load(loadChildrenString: string): Promise<NgModuleFactory<any>> {

    const offlineMode = this.compiler instanceof Compiler;
    const type = this.moduleMap[loadChildrenString];

    if (!type) {
      throw new Error(`${loadChildrenString} did not exist in the MODULE_MAP`);
    }

    return (offlineMode ?
      this.loadFactory(<NgModuleFactory<any>> type) : this.loadAndCompile(<Type<any>> type))
      .then((factory: NgModuleFactory<any>) => this.localizeFactory(factory));

  }

  private loadFactory(factory: NgModuleFactory<any>): Promise<NgModuleFactory<any>> {
    return new Promise(resolve => resolve(factory));
  }

  private loadAndCompile(type: Type<any>): Promise<NgModuleFactory<any>> {
    return this.compiler.compileModuleAsync(type);
  }

  private localizeFactory(factory: NgModuleFactory<any>) {
    return {
      moduleType: factory.moduleType,
      create: (parentInjector: Injector) => {
        const module = factory.create(parentInjector);
        const getMethod = module.injector.get.bind(module.injector);

        module.injector['get'] = (token: any, notFoundValue: any) => {
          const getResult = getMethod(token, notFoundValue);

          if (token === ROUTES) {
            // translate lazy routes
            return this.localize.initChildRoutes([].concat(...getResult));
          } else {
            return getResult;
          }
        };
        return module;
      }
    };
  }

}
