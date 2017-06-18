import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as _ from 'underscore';

@Injectable()
export class RestService {

  public cores: any = [];
  public itemsObject: any = {};
  public item: any = [];
  public config: any = [];
  public errorMessage:string = '';
  public cart:any = {};
  public totalSum: number = 0;
  public cartKeys: any;
  public userRole: string;

  private ip = 'localhost:3000';

  constructor(private http: Http) { }

  public addCore(body){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    body.id = + new Date();
    return this.http.post('http://' + this.ip + '/api/add/core',body, options)
      .subscribe((res) => {
      });
  }

 public getCores() : Observable<any> {
    if (this.cores.length > 0) {
      return Observable.of(this.cores);
    } else {
      return this.http.get('http://' + this.ip + '/api/cores')      //Запрос на получение массива всех товаров
        .map((res) => {
          let body = res['_body'];
          this.cores = JSON.parse(body);
          const itemCheker = (item,category) => item.category === category;   //Функия проверки элменета соответсвию категории, указаной в качестве аргумента этой ф-ции
          let mb = [],  //Временные массивы
            cores =[],
            gc = [],
            cold = [],
            ram = [],
            hdd = [],
            bp = [],
            cases = [];
          this.cores.forEach(function (item) {      //Проходим по всем товарам и с помощью ф-ции проверки размещаем каждый товар в соответвствущем временном массиве
            if (itemCheker(item, 'Материнская плата')) mb.push(item);
            if (itemCheker(item, 'Процессор')) cores.push(item);
            if (itemCheker(item, 'Охлаждение')) cold.push(item);
            if (itemCheker(item, 'Видеокарта')) gc.push(item);
            if (itemCheker(item, 'Оперативная память')) ram.push(item);
            if (itemCheker(item, 'Жесткий диск')) hdd.push(item);
            if (itemCheker(item, 'Блок питания')) bp.push(item);
            if (itemCheker(item, 'Корпус')) cases.push(item);
          });
          //Присвяем временные масивы к полям общего объекта
          this.itemsObject.motherBoards = mb;
          this.itemsObject.cores = cores;
          this.itemsObject.cold = cold;
          this.itemsObject.graphicCards = gc;
          this.itemsObject.ram = ram;
          this.itemsObject.hdd = hdd;
          this.itemsObject.bp = bp;
          this.itemsObject.cases = cases;
          return res;
        });
    }
 }

  public getProductById(id): Observable<any> {
    return this.http.get('http://' + this.ip + '/api/product/' + id)
      .map((res) => {
        let body = res['_body'];
        this.item = JSON.parse(body);
      });
  }

  public addItemToConfig(item){
    const isUniq = test => test.category !== item.category;
    let uniq = true;
    this.config.forEach(function (el) {
      if (!isUniq(el)) uniq = false;
    });
    uniq || this.config.length === 0 ? this.config.push(item) : this.errorMessage = 'Вы уже добавили товар категории ' + item.category;

    const itemCheker = (el,category) => el.category === category;
    let filteredItems: any = [];

    if (itemCheker(item, 'Процессор')) {        //Если выбранные товар Процессор
      this.itemsObject.motherBoards.forEach(function (el) {     //Проходим по всем товарам категории Материская плата
        if (el['socket'].toLowerCase() === item.socket.toLowerCase()) filteredItems.push(el);     //Выбираем только те элменты сокет которых совпадает с сокетом выбранного процессора
      });
      this.itemsObject.motherBoards = filteredItems;      //Добавляем полученные элменты в общий объект
    }
    if (itemCheker(item, 'Блок питания')) {       //Если выбранный товар Блок питания
      filteredItems = [];
      let self = this;
      this.itemsObject.cases.forEach(function (el) {      //Проходим по всем товарам категории Корпус
          if (self.config[1]['size'] === el.size) filteredItems.push(el);     //Выбираем только те товары размер которых совпадает с размером выбранной в конфигруации материнской платой
      });
      this.itemsObject.cases = filteredItems;     //Добавляем полученные элменты в общий объект
    }
    if (itemCheker(item, 'Жесткий диск')) {     //Если выбранный товар Жесткий диск
      filteredItems = [];
      let self = this;
      this.itemsObject.bp.forEach(function (el) {     //Проходим по всем товарам категории Блок питания
        if ((parseInt(self.config[0]['power']) + parseInt(self.config[2]['power']) + 100) < parseInt(el.power)) filteredItems.push(el); //Выбираем только те товары мощнсть которых больше чем мощность процессора + мощность видеокарты + 100Вт запаса
      });
      this.itemsObject.bp = filteredItems;      //Добавляем полученные элменты в общий объект
    }
    if (itemCheker(item, 'Видеокарта')) {     //Если выбранный товар Видеокарта
      filteredItems = [];
      let self = this;
      this.itemsObject.cold.forEach(function (el) {       //Проходи по всем товарам категории Охлаждение
        if ((parseInt(self.config[0]['power']) > 90 && parseInt(el.size) >= 120 && el.socket.indexOf(self.config[0]['socket'].split(' ')[self.config[0]['socket'].split(' ').length - 1]) !== -1) || (parseInt(self.config[0]['power']) < 90 && parseInt(el.size) < 93 && el.socket.indexOf(self.config[0]['socket'].split(' ')[self.config[0]['socket'].split(' ').length - 1]) !== -1)) filteredItems.push(el);
        /*Добавляем только те элементы, которые удовлетворяют следущим условиям:
        1.Если мощность выбранного процессора больше 90Вт и размер куллера больше или равен 120х120 и сокет куллера совпадает с сокетом выбранного процессора
        ИЛИ
        2. Если мощность выбранного процессора меньше 90Вт и размер куллера меньше 93х93 и сокет куллера совпадает с сокетом выбранного проессора
         */
      });
      this.itemsObject.cold = filteredItems;      //Добавляем полученные элменты в общий объект
    }
    if (this.config.length === 8) {
      let countObj = {value:1};
      let self = this;
      this.config.forEach(function (item) {
        self.addItemToCart(item,countObj);
      });
    }
    event.preventDefault();
  }

  addItemToCart(item:any, count: any){
      let product = Object.assign({},item);
      let nameChecker = (itemp:any, el:any) => itemp.productName === el.productName;
      let uniq = true;
      if(this.cart[product.category]) {
        this.cart[product.category].forEach(function (elem:any) {
          if(nameChecker(product,elem)) {
            elem.count += +count.value;
            elem.price = product.price*elem.count;
            uniq = false;
          } else {
            uniq = true;
          }
        });
      }
      !!+count.value ? product.count = +count.value : product.count = 1;
      if (!Array.isArray(this.cart[product.category])) this.cart[product.category] = [];
      product.price = +product.price * +count.value;
      if(uniq) this.cart[product.category].push(product);
      this.cartKeys = Object.keys(this.cart);
      this.totalSum += product.price;
  }

  removeItemFromCart(item:any) {
    let self = this;
    this.cart[item.category].forEach(function (elem, i) {
      if(item.productName === elem.productName) {
        self.cart[item.category].splice(i,1);
      }
    })
  }

  decriseCount(item:any){
    let cost = item.price / item.count;
    item.count--;
    item.price = item.count*cost;
  }

  incriseCount(item:any){
    let cost = item.price / item.count;
    item.count++;
    item.price = item.count*cost;
  }

}
