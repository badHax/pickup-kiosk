import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropoffComponent } from './flows/dropoff/dropoff.component';
import { PickupComponent } from './flows/pickup/pickup.component';
import { DialogsComponent } from './flows/dialogs/dialogs.component';
import { HomeComponent } from './home/home.component';
import { MultipleComponent as PickupMultipleComponent } from './flows/pickup/multiple/multiple.component';
import { TimeoutComponent } from './flows/timeout/timeout.component';
import { TimeoutComponent as TimeoutDropoffComponent } from './flows/dropoff/timeout/timeout.component';
import { MultipleComponent as DropoffMultipleComponent } from './flows/dropoff/multiple/multiple.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { FlowsComponent } from './flows/flows.component';
import { SingleComponent } from './flows/dropoff/single/single.component';
import { MultipleComponent } from './flows/dropoff/multiple/multiple.component';
import { SlotsComponent } from './flows/dropoff/slots/slots.component';
import { LogoComponent } from './logo.component';
import { SuccessComponent } from './flows/dropoff/success/success.component';
import { NotfoundComponent } from './flows/dropoff/slots/notfound/notfound.component';
import { SingleComponent as PickupSingleComponent } from './flows/pickup/single/single.component';
import { environment } from 'src/environments/environment';
import { NgxLanguageSelectorModule } from 'ngx-language-selector';

@NgModule({
  declarations: [
    AppComponent,
    DropoffComponent,
    PickupComponent,
    DialogsComponent,
    HomeComponent,
    LogoComponent,
    PickupComponent,
    PickupMultipleComponent,
    PickupSingleComponent,
    DropoffComponent,
    TimeoutComponent,
    TimeoutDropoffComponent,
    SlotsComponent,
    DropoffMultipleComponent,
    KeyboardComponent,
    FlowsComponent,
    SingleComponent,
    MultipleComponent,
    SlotsComponent,
    SuccessComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxLanguageSelectorModule,
    //SocketIoModule.forRoot({ url: `http://${environment.LOCKER_IP}:${environment.LOCKER_PORT}`, options: {} }) ,
    NgxUiLoaderModule.forRoot({
      bgsColor: '#ffb812',
      bgsOpacity: 0.5,
      bgsPosition: 'bottom-right',
      bgsSize: 60,
      bgsType: 'ball-spin-clockwise',
      blur: 5,
      delay: 0,
      fastFadeOut: true,
      fgsColor: '#ffb812',
      fgsPosition: 'center-center',
      fgsSize: 60,
      fgsType: 'folding-cube',
      gap: 24,
      logoPosition: 'center-center',
      logoSize: 120,
      logoUrl: '',
      masterLoaderId: 'master',
      overlayBorderRadius: '0',
      overlayColor: 'rgba(40, 40, 40, 0.8)',
      pbColor: '#ffb812',
      pbDirection: 'ltr',
      pbThickness: 3,
      hasProgressBar: true,
      text: 'Please wait...',
      textColor: '#FFFFFF',
      textPosition: 'center-center',
      maxTime: -1,
      minTime: 300,
    }),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-full-width',
      preventDuplicates: true,
      closeButton: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
