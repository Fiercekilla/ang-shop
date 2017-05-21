import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {RestService} from "../rest/rest.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  private id: any;
  private sub: any;

  constructor(private route: ActivatedRoute,
              public rest: RestService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
    console.log(this.id);
    this.rest.getProductById(this.id);
  }

}
