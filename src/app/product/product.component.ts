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
  private product: any;
  public activeItem: any;
  public activeCategory: string;
  public suitProducts: any;
  constructor(private route: ActivatedRoute,
              public rest: RestService) { }

  ngOnInit() {
    this.suitProducts = {};
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.rest.getCores().subscribe(() => {
        console.log(this.id);
        this.rest.getProductById(this.id).subscribe(() => {
          this.activeItem = this.rest.item[0];
          this.activeCategory = this.activeItem.category;
          console.log(this.activeCategory);
          switch (this.activeCategory) {
            case 'Процессор':
              for (let i = 0; i < this.rest.cores.length; i++) {
                if (this.rest.cores[i].category === 'Материнская плата' && this.rest.cores[i].socket.toLowerCase() === this.activeItem.socket.toLowerCase()) {
                  this.suitProducts.motherBoards = [];
                  this.suitProducts.motherBoards.push(this.rest.cores[i]);
                } else if (this.rest.cores[i].category === 'Куллер' && this.rest.cores[i].power.toLowerCase() === this.activeItem.power.toLowerCase()) {
                  this.suitProducts.cooler = [];
                  this.suitProducts.cooler.push(this.rest.cores[i]);
                }
              }
              break;
            case 'Материнская плата':
              for (let i = 0; i < this.rest.cores.length; i++) {
                if (this.rest.cores[i].category === 'Корпус' && this.rest.cores[i].size.toLowerCase() === this.activeItem.size.toLowerCase()) {
                  this.suitProducts.boxes = [];
                  this.suitProducts.boxes.push(this.rest.cores[i]);
                }
              }
              break;
            case 'Корпус':
              for (let i = 0; i < this.rest.cores.length; i++) {
                if (this.rest.cores[i].category === 'Корпус' && this.rest.cores[i].size.toLowerCase() === this.activeItem.size.toLowerCase()) {
                  this.suitProducts.motherBoard = [];
                  this.suitProducts.motherBoard.push(this.rest.cores[i]);
                }
              }
              break;
            case 'Куллер':
              for (let i = 0; i < this.rest.cores.length; i++) {
                if (this.rest.cores[i].category === 'Процесср' && this.rest.cores[i].power.toLowerCase() === this.activeItem.power.toLowerCase()) {
                  this.suitProducts.cpus = [];
                  this.suitProducts.cpus.push(this.rest.cores[i]);
                }
              }
              break;
          }
          console.info(this.suitProducts);
        });
      });
    });

  }

}
