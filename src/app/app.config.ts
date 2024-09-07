import { ApplicationConfig, importProvidersFrom, Renderer2 } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headerInterceptor } from './core/interceptors/header.interceptor';
import { errorsInterceptor } from './core/interceptors/errors.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './interceptor/loading.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';


//fun to load translation files
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}







export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions() ), provideClientHydration(),
    //importProvidersFrom(HttpClientModule) -->angular 17 still used without errors 
    provideHttpClient(withFetch(),withInterceptors([headerInterceptor,errorsInterceptor,loadingInterceptor])),
    //more helpfull from importProvidersFrom(HttpClientModule) 
    //advantedge because it convert httpClient from xml --> fetch
    //stable in angular 18


    //##owlCaroule

    // importProvidersFrom(BrowserAnimationsModule),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(
      NgxSpinnerModule,
      HttpClientModule,
      TranslateModule.forRoot({
        // defaultLanguage:'en',
        loader: {
          provide: TranslateLoader,
          useFactory:(HttpLoaderFactory),
          deps:[HttpClient]
        }
      })

    ),

  ]
};
