import { Component, OnInit } from '@angular/core';
import {LockerService} from '../_services/locker.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private _locker: LockerService) {}

  ngOnInit(): void {
    //remove data from previous session
    localStorage.clear();
    console.log('These are the connected devices');
    this._locker.getAllSlotStatus();
  }
}
