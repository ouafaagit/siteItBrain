import { NgModule } from '@angular/core';
import {SiteclientModule} from "./siteclient/siteclient.module";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
//import {BrowserModule} from "@angular/platform-browser";



@NgModule({

  imports: [
    SiteclientModule,
  //  SiteadminModule,
    CommonModule,
  //  BrowserModule,
   FormsModule
  ],

  declarations: [ ],



})
export class SiteModule { }
