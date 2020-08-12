import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { KeyboardComponent } from '../../keyboard/keyboard.component';
import { ApiService } from '../../../services/api.service';
import { ClassField } from '@angular/compiler';

@Component({
  selector: 'app-dropoff',
  templateUrl: './dropoff.component.html',
  styleUrls: ['./dropoff.component.scss'],
})
export class DropoffComponent implements OnInit {
  @ViewChild(KeyboardComponent) onScreenKeyboard;
  @Input() isDisabled: boolean = false;
  @Input() value: string = '';
  @Input() fieldError: string = 'paragraph';

  public toggleKeyboard: boolean = false;
  public codePattern = /^[a-zA-Z0-9]{10}$/;

  constructor(
    private _api: ApiService,
    private _router: Router,
    private _toast: ToastrService,
    private _loader: NgxUiLoaderService
  ) {}

  ngOnInit(): void {}

  public scanLabel(code: string) {
    this._loader.start();
    return this._api
      .sendPost({ code: code }, this._api.POST_SCAN_DROPOFF_LABEL)
      .subscribe(
        (data) => {
          console.log(data);
          localStorage.setItem('CURRENT_DELIVERY', JSON.stringify(data));
          this._loader.stop();
          this._router.navigate(['~/dropoff/single']);
        },
        (error) => {
          this._loader.stop();
          this.isDisabled = false;

          if(error.status === 422){
            this._router.navigate(['~/dropoff/slots/none'])
          }

          console.log(error.error.message);
          if (error.error.message) {
            this.showInvalidError();
            return;
          }

          this._router.navigate(['~/dialogs'], {
            queryParams: { type: 'ERROR' },
          });
          console.log(error);
        }
      );
  }

  public showInvalidError() {
    this.isDisabled = false;
    this.value = '';
    this.fieldError = 'paragraph error';
  }
  public hideInvalidError() {
    this.fieldError = 'paragraph';
  }
  public receiveMessage($event) {
    this.value = $event;
    this.handleSoftKeyUp(this.value);
  }

  public handleKeyUp(e) {
    const codeEntered: string = e.target.value.toString();
    if (this.codePattern.test(codeEntered)) {
      this.validateCode(codeEntered);
    }
    if (codeEntered === '') this.hideInvalidError();
  }

  public handleSoftKeyUp(code: string) {
    if (this.codePattern.test(code)) {
      this.validateCode(code);
    }
    if (code === '') this.hideInvalidError();
  }

  public validateCode(codeEntered: string) {
    this.isDisabled = true;
    // code entered
    if (codeEntered.toUpperCase().startsWith('L')) {
      this.scanLabel(codeEntered.toLocaleUpperCase());
    } else {
      //not valid
      this.showInvalidError();
    }
  }
}
