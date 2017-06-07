import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RestService} from "../rest/rest.service";
import { PagerService } from "../pager.service";

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
    {name: 'Охлаждение', id: 'cold',
      tooltip: 'tooltip'},
    {name: 'Оперативная память', id: 'ram',
      tooltip: 'tooltip'},
    {name: 'Жеткий диск', id: 'hdd',
      tooltip: 'tooltip'},
    {name: 'Блок питания', id: 'bp',
      tooltip: 'tooltip'},
    {name: 'Корпус', id: 'cases',
      tooltip: 'tooltip'}
  ];
  public configuratedItems: any;
  public activeTooltip: string;
  public pager: any = {};
  public pagedItems: any = [];

  private activeCategory: string;

  constructor(private rest: RestService,
              private router: Router,
              private pagerService: PagerService) { }

  ngOnInit() {
    this.activeCategory = 'cores';
    this.rest.getCores().subscribe(() => {this.setPage(this.activeCategory,1);});
    this.activeTooltip = this.categories[0]['tooltip'];


  }

  public setPage(category: string, page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.rest.itemsObject[category].length,page);
    this.pagedItems[category] = this.rest.itemsObject[category].slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  public changeCategory(event:any) {
    this.activeTooltip = this.categories[event.index]['tooltip'];
    this.activeCategory = this.categories[event.index].id;
    this.setPage(this.activeCategory,1);
  }

}
