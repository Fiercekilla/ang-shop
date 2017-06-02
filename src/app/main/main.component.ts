import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RestService} from "../rest/rest.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

  public categories = [
    {name: 'Процессор', id: 'cores'},
    {name: 'Материнская плата', id: 'motherBoards'},
    {name: 'Видеокарта', id: 'graphicCards'},
    {name: 'Охлаждение', id: 'cold'},
    {name: 'Оперативная память', id: 'ram'},
    {name: 'Жеткий диск', id: 'hdd'},
    {name: 'Блок питания', id: 'bp'},
    {name: 'Корпус', id: 'cases'}
  ];
  //public categories = ['Процессор','Материнская плата', 'Видеокарта','Охлаждение', 'Оперативная память','Жесткий диск', 'Блок питания', 'Корпус' ];
  public configuratedItems: any;

  constructor(private rest: RestService,
              private router: Router) { }

  ngOnInit() {
    this.rest.getCores().subscribe();
  }



}
