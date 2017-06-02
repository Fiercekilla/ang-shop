import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RestService} from "../rest/rest.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

  public categories = [
    {name: 'Процессор', id: 'cores',
      tooltip: " Процессор -  электронный блок либо интегральная схема (микропроцессор), исполняющая машинные инструкции (код программ), главная часть аппаратного обеспечения компьютера или программируемого логического контроллера. Иногда называют микропроцессором или просто процессором."},
    {name: 'Материнская плата', id: 'motherBoards',
      tooltip: "Материнская плата -  печатная плата, являющаяся основой построения модульного устройства, например — компьютера.Материнская плата содержит основную часть устройства, дополнительные же или взаимозаменяемые платы называются дочерними или платами расширения."},
    {name: 'Видеокарта', id: 'graphicCards',
      tooltip: "Видеокарта - устройство, преобразующее графический образ, хранящийся как содержимое памяти компьютера (или самого адаптера), в форму, пригодную для дальнейшего вывода на экран монитора. Первые мониторы, построенные на электронно-лучевых трубках, работали по телевизионному принципу сканирования экрана электронным лучом, и для отображения требовался видеосигнал, генерируемый видеокартой."},
    {name: 'Охлаждение', id: 'cold'},
    {name: 'Оперативная память', id: 'ram'},
    {name: 'Жеткий диск', id: 'hdd'},
    {name: 'Блок питания', id: 'bp'},
    {name: 'Корпус', id: 'cases'}
  ];
  public configuratedItems: any;
  public activeTooltip: string;

  constructor(private rest: RestService,
              private router: Router) { }

  ngOnInit() {
    this.rest.getCores().subscribe();
    this.activeTooltip = this.categories[0]['tooltip'];
  }

  public changeCategory(event:any) {
    console.log(event);
    this.activeTooltip = this.categories[event.index]['tooltip'];
    console.info(this.activeTooltip);
  }

}
