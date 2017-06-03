import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public login: string;
  public pass: string;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }


}
