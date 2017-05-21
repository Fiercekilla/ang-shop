import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from "@angular/http";

@Injectable()
export class RestService {

  public cores: any = [];
  public item: any = [];
  public config: any = [];

  constructor(private http: Http) { }

  public addCore(body){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    body.id = + new Date();
    console.info(body);
    return this.http.post('http://localhost:3000/api/add/core',body, options)
      .subscribe((res) => {
        console.log(res);
      });
  }

 public getCores() {
    return this.http.get('http://localhost:3000/api/cores')
      .subscribe((res) => {
        let body = res['_body'];
        this.cores = JSON.parse(body);
      });
  }

  public getProductById(id) {
    return this.http.get('http://localhost:3000/api/product/' + id)
      .subscribe((res) => {
        let body = res['_body'];
        this.item = JSON.parse(body);
      });
  }

  public addItemToConfig(item){
    this.config.push(item);
    event.preventDefault();
  }
}
