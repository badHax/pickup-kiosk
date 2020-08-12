import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { KeyboardComponent } from 'src/app/keyboard/keyboard.component';
import { ApiService } from 'src/services/api.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.scss']
})
export class PickupComponent implements OnInit {

  @ViewChild(KeyboardComponent) onScreenKeyboard;
  @Input() isDisabled: boolean = false;
  @Input() value: string = '';
  @Input() fieldError: string = 'paragraph';

  public toggleKeyboard: boolean = false;
  public codePattern = /^[a-zA-Z0-9]{10}$/;

  constructor(
    private _api: ApiService,
    private _router: Router,
    private _loader: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
  }

  scanPickupCode(code: string) {
    this._loader.start();
    return this._api
      .sendPost({ code: code }, this._api.POST_SCAN_PICKUP_CODE)
      .subscribe(
        (data) => {
          console.log(data);
          localStorage.setItem('CURRENT_PICKUP', JSON.stringify(data));
          this._loader.stop();
          this._router.navigate(['~/pickup/single']);
        },
        (error) => {
          this._loader.stop();
          this.isDisabled = false;

          console.log(error.error.message);
          if (error.error.message) {
            this.showInvalidError();
            return;
          }
          console.log(error);
        }
      );
  }

  showInvalidError() {
    this.isDisabled = false;
    this.value = '';
    this.fieldError = 'paragraph error';
  }
  hideInvalidError() {
    this.fieldError = 'paragraph';
  }
  receiveMessage($event) {
    this.value = $event;
    this.handleSoftKeyUp(this.value);
  }

  handleKeyUp(e) {
    const codeEntered: string = e.target.value.toString();
    if (this.codePattern.test(codeEntered)) {
      this.validateCode(codeEntered);
    }
    if (codeEntered === '') this.hideInvalidError();
  }

  handleSoftKeyUp(code: string) {
    if (this.codePattern.test(code)) {
      this.validateCode(code);
    }
    if (code === '') this.hideInvalidError();
  }

  validateCode(codeEntered: string) {
    this.isDisabled = true;
    // code entered
    if (codeEntered.toUpperCase().startsWith('P')) {
      this.scanPickupCode(codeEntered.toLocaleUpperCase());
    } else {
      //not valid
      this.showInvalidError();
    }
  }

}
