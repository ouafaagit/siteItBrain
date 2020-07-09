 import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
// import {HttpInterceptorService} from "./httpInterceptor.service";
 import {NgModule} from "@angular/core";
 import {FormsModule, ReactiveFormsModule} from "@angular/forms";
 import {JwtInterceptor} from "./components/_interceptors/jwt-interceptor.service";
 import {ErrorInterceptor} from "./components/_interceptors/error-interceptor.service";
 import {CookieService} from "ngx-cookie-service";
 import {SiteclientModule} from "./components/pages/siteclient/siteclient.module";
 import {CommonModule} from "@angular/common";
 import {NgxPaginationModule} from "ngx-pagination";



const appRoutes: Routes = [{
  path: '',
  loadChildren: () => import('src/app/components/pages/site.module').then(m => m.SiteModule)
},
/* {
    path: ' ',
    redirectTo :'site/dashboard'
  }*/
  ];

@NgModule({
  declarations: [
    AppComponent,


   // ReactiveFormsModule
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    SiteclientModule,
    NgxPaginationModule
  ],

     /* provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true*/
      providers: [CookieService,
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
      bootstrap: [AppComponent]
})
export class AppModule {
}
