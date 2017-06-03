import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdTabNavBar, MdTabsModule } from '@angular/material';

import { AppComponent } from './app.component';
import { RestService } from "./rest/rest.service";
import { MainComponent } from './main/main.component';
import {AppRoutingModule} from "./app-routing.module";
import { ProductComponent } from './product/product.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProductComponent,
    SingleProductComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MdTabsModule
  ],
  providers: [
    RestService,
    MdTabNavBar,
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
