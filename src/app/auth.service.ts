import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { reject } from "q";
import { retry } from "rxjs/operator/retry";
import { RestService } from "./rest/rest.service";

@Injectable()
export class AuthService {

  public isLogged: boolean = false;
  public loginErrorMessage: string;

  private users = [
    {
      userType: 'admin',
      login: 'admin',
      password: 'admin'
    },
    {
      userType: 'user',
      login: 'user',
      password: 'user'
    }
  ];

  constructor(private router: Router,
              private rest: RestService) { }

  login(login:string, password:string) {
    const authCheker = (userItem, inputLogin, inputPassword) => {
      if (userItem.login === inputLogin && userItem.password === inputPassword) {
        this.isLogged = true;
        this.rest.userRole = userItem.userType;
        this.router.navigate(['/']);
        this.loginErrorMessage = null;
      } else {
        if (!this.isLogged) this.loginErrorMessage = 'Неверный логин или пароль!';
      }
    };
    this.users.forEach(function (item) {
      authCheker(item, login, password);
    });
  }

  isAuthed() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {resolve(this.isLogged);}, 800);
    });
    return promise;
  }

  logout() {
    this.isLogged = false;
    this.router.navigate(['/login']);
  }


}
