import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RestService} from "../rest/rest.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

  constructor(private rest: RestService,
              private router: Router) { }

  ngOnInit() {
    this.rest.getCores();
  }



}
