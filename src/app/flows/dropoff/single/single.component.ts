import { Component, OnInit, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../_services/api.service';
import { Slot } from '../../../_models/slot.model';
import { Package } from '../../../_models/package.model';

@Component({
  selector: 'app-dropoff-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss'],
})
export class SingleComponent implements OnInit {
  userActivity: any;
  userInactive: Subject<any> = new Subject();
  private currentPackage: Package;
  private currentSlot: Slot;

  constructor(private _router: Router, private _api: ApiService) {
    this.setTimeout();

    //user has been inactive for 15 seconds
    this.userInactive.subscribe(() => _router.navigate(['~/dropoff/timeout']));
  }

  ngOnInit(): void {
    this.currentPackage = JSON.parse(
      localStorage.getItem('CURRENT_DELIVERY')
    ).package;
    this.currentSlot = JSON.parse(localStorage.getItem('CURRENT_DELIVERY')).slot;
  }

  openSlot() {
    //open this slot
    //this.currentSlot
  }

  public finishDropoff() {
    console.log(this.currentSlot);
    console.log(this.currentPackage);
    this._api
      .sendPut(
        { packageId: this.currentPackage._id },
        this._api.POST_ALLOCATE_SLOT.replace('{id}',this.currentSlot._id)
      )
      .subscribe(
        (data) => {
          clearTimeout(this.userActivity);
          this._router.navigate(['~/dropoff/multiple']);
        },
        (error) => {
          clearTimeout(this.userActivity);
          if (error.status === 400) {
            this._router.navigate(['~/dropoff/slots/none']);
          }
          console.log(error);
          this._router.navigate(['~/dialogs'],{queryParams:{type:'ERROR'}});
        }
      );
  }
  setTimeout() {
    this.userActivity = setTimeout(
      () => this.userInactive.next(undefined),
      environment.appTimeoutMilliSeconds
    );
  }

  @HostListener('window:click')
  @HostListener('window:keyup')
  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }
}
