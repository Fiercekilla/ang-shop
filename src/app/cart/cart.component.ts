import { Component, OnInit } from '@angular/core';
import { RestService } from "../rest/rest.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})

export class CartComponent implements OnInit {

  public docDate: any;

  constructor(public rest:RestService) { }

  ngOnInit() {
    this.docDate = new Date();
  }

  public printCart() {
    let printContents, popupWin;
    printContents = document.getElementById('printContent').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>ООО "ДарТрек"</title>
          <style>
            button {
              display: none;
            }
            .print-info .title {
              text-align: center;
              font-size: 1.5em;
              font-weight: bold;
            }
            
            .cart-products {
              border: 1px solid black;
              padding: 20px;
            }
            
            .cart-products li {
              list-style-type: none;
              margin-bottom: 10px;
            }
            
            .cart-products .cart-product-item {
              border: 1px solid black;
              list-style-type: none;
              padding: 5px;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            }

          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

}
