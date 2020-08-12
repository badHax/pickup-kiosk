import { Component, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit {

  @Output() type: string;

  constructor(private route:ActivatedRoute) {
   }

  ngOnInit(): void {
    this.route.
    queryParams.
    subscribe(params =>{
      console.log(params['type']);
      this.type = params['type'];
      console.log(this.type==='FINISHED')
    });

  }
}
