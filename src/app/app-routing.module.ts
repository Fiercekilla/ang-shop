import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "app/main/main.component";
import {ProductComponent} from "app/product/product.component";


const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'product/:id', component: ProductComponent },

];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
