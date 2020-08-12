import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { DialogsComponent } from './flows/dialogs/dialogs.component';
import { DropoffComponent } from './flows/dropoff/dropoff.component';
import { PickupComponent } from './flows/pickup/pickup.component';
import { HomeComponent } from './home/home.component';
import { MultipleComponent as PickupMulti } from './flows/pickup/multiple/multiple.component';
import { SingleComponent as DropoffSingleComponent } from './flows/dropoff/single/single.component';
import { MultipleComponent as DropoffMultipleComponent } from './flows/dropoff/multiple/multiple.component';
import { TimeoutComponent } from './flows/timeout/timeout.component';
import { TimeoutComponent as DropoffTimeout } from './flows/dropoff/timeout/timeout.component';
import { SlotsComponent } from './flows/dropoff/slots/slots.component';
import { FlowsComponent } from './flows/flows.component';
import { SuccessComponent } from './flows/dropoff/success/success.component';
import { NotfoundComponent } from './flows/dropoff/slots/notfound/notfound.component';
import { SingleComponent as PickupSingleComponent } from './flows/pickup/single/single.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: '~',
    component: FlowsComponent,
    children: [
      { path: 'pickup', component: PickupComponent },
      { path: 'pickup/multiple', component: PickupMulti },
      { path: 'pickup/single', component: PickupSingleComponent },
      { path: 'timeout', component: TimeoutComponent },
      { path: 'dropoff', component: DropoffComponent },
      { path: 'dropoff/single', component: DropoffSingleComponent },
      { path: 'dropoff/multiple', component: DropoffMultipleComponent },
      { path: 'dropoff/timeout', component: DropoffTimeout },
      { path: 'dropoff/slots', component: SlotsComponent },
      { path: 'dropoff/slots/none', component: NotfoundComponent },
      { path: 'dialogs', component: DialogsComponent },
      { path: 'dropoff/success', component: SuccessComponent },
      { path: 'timeout', component: TimeoutComponent },
    ],
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
