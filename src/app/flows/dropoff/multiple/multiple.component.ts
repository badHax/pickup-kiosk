import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { KeyboardComponent } from 'src/app/keyboard/keyboard.component';
import { DropoffComponent } from '../dropoff.component';
import { ApiService } from '../../../_services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-multiple',
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.scss'],
})
export class MultipleComponent extends DropoffComponent {
  constructor(
    _api: ApiService,
    _router: Router,
    _toast: ToastrService,
    _loader: NgxUiLoaderService
  ) {
    super(_api, _router, _toast, _loader);
  }

  ngOnInit(): void {}
}
