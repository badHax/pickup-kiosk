import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logo',
  template: ` <img
    (click)="goHome()"
    src="../assets/images/59c280ad22595c0001088e5a_L1.png"
    srcset="
      ../assets/images/59c280ad22595c0001088e5a_L1-p-500.png   500w,
      ../assets/images/59c280ad22595c0001088e5a_L1-p-800.png   800w,
      ../assets/images/59c280ad22595c0001088e5a_L1-p-1080.png 1080w,
      ../assets/images/59c280ad22595c0001088e5a_L1.png        1370w
    "
    sizes="150px"
    class="logo"
  />`,
  styleUrls: ['./app.component.scss'],
})
export class LogoComponent implements OnInit {
  constructor(private _router: Router) {}
  ngOnInit(): void {}

  goHome() {
    this._router.navigate(['']);
  }
}
