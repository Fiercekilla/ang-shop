import { Component, OnInit } from '@angular/core';
import {RestService} from "./rest/rest.service";
import {NgForm} from '@angular/forms';
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{

  title = 'app works!';

  public addPanel:boolean = false;
  public productItem: any = {};
  public showCart: boolean = false;

  constructor(public rest: RestService,
              public authService: AuthService){}

  ngOnInit() {

  }

  onSubmit(f: NgForm) {
    Object.assign(this.productItem, f.value);
    this.rest.addCore(this.productItem);
    console.info(f.value);
  }

  toggleAddPanel() {
    this.addPanel = !this.addPanel;
  }

  removeItemFromConfig(index) {
    this.rest.config.splice(index,1);
  }

  setCategory(value){
    this.productItem['category'] = value;
    console.log(this.productItem);
    console.log(value);
  }


}
