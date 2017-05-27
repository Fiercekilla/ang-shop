import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RestService} from "../rest/rest.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

  public categories = ['Процессор','Материнская плата', 'Видеокарта','Охлаждение', 'Оперативная память','Жесткий диск', 'Блок питания', 'Корпус' ];
  public configuratedItems: any;

  constructor(private rest: RestService,
              private router: Router) { }

  ngOnInit() {
    this.rest.getCores().subscribe();
  }



}
