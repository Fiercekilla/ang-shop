import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {RestService} from "../rest/rest.service";

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html'
})
export class SingleProductComponent implements OnInit {

  @Input('item') item: any;

  constructor(private router: Router,
              public rest: RestService) { }

  ngOnInit() {
  }

  openProduct(id, event) {
    if (event.target.classList[0] !== 'btn') {
      this.router.navigate(['/product/' + id]);
    }
  }

}
