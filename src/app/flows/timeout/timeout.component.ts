import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common'

@Component({
  selector: 'app-timeout',
  templateUrl: './timeout.component.html',
  styleUrls: ['./timeout.component.scss']
})
export class TimeoutComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }

  needMoreTime(): void{
    this._location.back();
  }
}
