import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {RestService} from "../rest/rest.service";
import { PagerService } from "../pager.service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})

export class ProductComponent implements OnInit {

  @Input() categoryView:boolean;
  @Input() category:string;

  private id: any;
  private sub: any;
  private product: any;
  public activeItem: any;
  public activeCategory: string;
  public suitProducts: any;
  public filteredItems:any;
  public pager:any = {};
  public pagedItems:any;

  constructor(private route: ActivatedRoute,
              public rest: RestService,
              private pagerService: PagerService,
              private  location: Location) { }

  ngOnInit() {
    this.suitProducts = {};
    if (this.categoryView) {
      const itemChecker = (item:any) => item.category === this.category;
      this.rest.getCores().subscribe(() => {
        this.filteredItems = this.rest.cores;
        this.filteredItems = this.filteredItems.filter(function (el) {
          return itemChecker(el);
        });
        this.setPage(1);
      })
    } else {
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

  public goBack() {
    this.location.back();
  }

  public setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.filteredItems.length,page);
    this.pagedItems = this.filteredItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
