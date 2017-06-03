import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { reject } from "q";
import { retry } from "rxjs/operator/retry";

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

  constructor(private router: Router) { }

  login(login:string, password:string) {
    const authCheker = (login,password, inputLogin, inputPassword) => {

      if (login === inputLogin && password === inputPassword) {
        this.isLogged = true;
        this.router.navigate(['/']);
      } else {
        this.loginErrorMessage = 'Неверный логин или пароль!';
      }
    };
    this.users.forEach(function (item) {
      authCheker(item.login, item.password, login, password);
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
