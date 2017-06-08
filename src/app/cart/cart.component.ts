import { Component, OnInit } from '@angular/core';
import { RestService } from "../rest/rest.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})

export class CartComponent implements OnInit {


  constructor(public rest:RestService) { }

  ngOnInit() {
  }

}
