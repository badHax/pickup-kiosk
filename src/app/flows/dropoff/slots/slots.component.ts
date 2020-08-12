import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss'],
})
export class SlotsComponent implements OnInit {
  @Output() medium: boolean = false;
  @Output() small: boolean = false;
  @Output() large: boolean = false;


  //check if slot is available
   slots = [];

  constructor(private _router: Router, private _api: ApiService) {}

  ngOnInit(): void {
    this.getAllAvailableSlots();
  }

  getAllAvailableSlots() {
    return this._api.sendGet(this._api.GET_ALL_SLOTS).subscribe(
      (data) => {
        data.map((slot) => {
          //note all available slots
          console.log(slot.status)
          if (
            slot.status ===
            'AVAILABLE'
          ) {
            if(slot.type === 'SMALL') this.small = true;
            if(slot.type === 'MEDIUM') this.medium = true;
            if(slot.type === 'LARGE') this.large = true;
            this.slots.push(slot);
          }
        });

        if (this.slots.length < 1) {
          console.log('NO SLOTS')
          this._router.navigate(['~/dropoff/slots/none']);
        }

        console.log(this.small);
        console.log(this.medium);
        console.log(this.large);
        console.log(this.slots);
      },
      (error) => {
        console.log(error);
      }
    );
  }


  pickLocker(size) {
    const newSlot = this.slots.find(x => x.type === size);
      let currentDelivery = JSON.parse(localStorage.getItem('CURRENT_DELIVERY'));
      currentDelivery.slot = newSlot;
      localStorage.setItem('CURRENT_DELIVERY', JSON.stringify(currentDelivery));
      this._router.navigate(['~/dropoff/single'])
  }
}
