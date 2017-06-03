import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "app/main/main.component";
import {ProductComponent} from "app/product/product.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./auth.guard";


const appRoutes: Routes = [
  { path: '', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'product/:id', component: ProductComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

}
