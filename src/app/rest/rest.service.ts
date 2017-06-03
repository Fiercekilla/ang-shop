import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RestService {

  public cores: any = [];
  public itemsObject: any = {};
  public item: any = [];
  public config: any = [];
  public errorMessage:string = '';

  private ip = 'localhost:3000';

  constructor(private http: Http) { }

  public addCore(body){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    body.id = + new Date();
    console.info(body);
    return this.http.post('http://' + this.ip + '/api/add/core',body, options)
      .subscribe((res) => {
        console.log(res);
      });
  }

 public getCores() : Observable<any> {
   return this.http.get('http://' + this.ip + '/api/cores')
     .map((res) => {
       let body = res['_body'];
       this.cores = JSON.parse(body);
       const itemCheker = (item,category) => item.category === category;
       let mb = [],
            cores =[],
            gc = [],
            cold = [],
            ram = [],
            hdd = [],
            bp = [],
            cases = [];
       this.cores.forEach(function (item) {
         if (itemCheker(item, 'Материнская плата')) mb.push(item);
         if (itemCheker(item, 'Процессор')) cores.push(item);
         if (itemCheker(item, 'Охлаждение')) cold.push(item);
         if (itemCheker(item, 'Видеокарта')) gc.push(item);
         if (itemCheker(item, 'Оперативная память')) ram.push(item);
         if (itemCheker(item, 'Жесткий диск')) hdd.push(item);
         if (itemCheker(item, 'Блок питания')) bp.push(item);
         if (itemCheker(item, 'Корпус')) cases.push(item);
       });
       this.itemsObject.motherBoards = mb;
       this.itemsObject.cores = cores;
       this.itemsObject.cold = cold;
       this.itemsObject.graphicCards = gc;
       this.itemsObject.ram = ram;
       this.itemsObject.hdd = hdd;
       this.itemsObject.bp = bp;
       this.itemsObject.cases = cases;
       console.info(this.itemsObject);
     });
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
    console.log(this.config);

    if (itemCheker(item, 'Процессор')) {
      this.itemsObject.motherBoards.forEach(function (el) {
        if (el['socket'].toLowerCase() === item.socket.toLowerCase()) filteredItems.push(el);
      });
      this.itemsObject.motherBoards = filteredItems;
      console.log(this.itemsObject.motherBoards);
    }
    if (itemCheker(item, 'Блок питания')) {
      filteredItems = [];
      let self = this;
      this.itemsObject.cases.forEach(function (el) {
          if (self.config[1]['size'] === el.size) filteredItems.push(el);
      });
      this.itemsObject.cases = filteredItems;
      console.log(this.itemsObject.cases);
    }



    event.preventDefault();
  }
}
