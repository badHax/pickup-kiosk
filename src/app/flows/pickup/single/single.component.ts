import { Component, OnInit, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { Slot } from '../../../_models/slot.model';
import { Router } from '@angular/router';
import { ApiService } from '../../../_services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss'],
})
export class SingleComponent implements OnInit {
  userActivity: any;
  userInactive: Subject<any> = new Subject();
  private currentSlot: Slot;

  constructor(private _router: Router, private _api: ApiService) {
    this.setTimeout();

    //user has been inactive for 15 seconds
    this.userInactive.subscribe(() => _router.navigate(['~/timeout']));
  }

  ngOnInit(): void {
    this.currentSlot = JSON.parse(localStorage.getItem('CURRENT_PICKUP')).slot;
  }

  openSlot() {
    //open this slot
    //this.currentSlot
  }

  finishPickup() {
    console.log(this.currentSlot);
    clearTimeout(this.userActivity);

    //TODO: check if slot closed

    //finished
    this._router.navigate(['~/dialogs'], { queryParams: { type: 'FINISHED' } });
  }
  setTimeout() {
    this.userActivity = setTimeout(
      () => this.userInactive.next(undefined),
      environment.appTimeoutMilliSeconds
    );
  }

  @HostListener('window:click')
  @HostListener('window:keyup')
  @HostListener('window:mousemove')
  refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }
}
