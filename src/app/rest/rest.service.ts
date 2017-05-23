import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RestService {

  public cores: any = [];
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
    if (this.config.length > 0) {
      for (let i = 0; i < this.config.length; i++) {
        if (item.category === this.config[i].category) {
          this.errorMessage = 'Вы уже добавили товар категории ' + item.category + ' в конфигуратор';
          break;
        } else {
          this.errorMessage = null;
          this.config.push(item);
        }
      }
    } else {
      this.config.push(item);
    }

    event.preventDefault();

  }
}
