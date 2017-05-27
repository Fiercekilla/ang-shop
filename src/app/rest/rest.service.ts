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

  private ip = '176.193.157.114';

  constructor(private http: Http) { }

  public addCore(body){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    body.id = + new Date();
    console.info(body);
    return this.http.post('http://' + this.ip + ':3000/api/add/core',body, options)
      .subscribe((res) => {
        console.log(res);
      });
  }

 public getCores() : Observable<any> {
   return this.http.get('http://' + this.ip + ':3000/api/cores')
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
            cases = []
       ;
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
    return this.http.get('http://' + this.ip + ':3000/api/product/' + id)
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

    event.preventDefault();
  }
}
