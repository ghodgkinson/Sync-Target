import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {AutoCompleteModule} from 'primeng/autocomplete';

import { MapComponent } from './map.component';
import { OutageReportComponent } from '../reports/outage.report.component';
const routes: Routes = [
  {
    path: 'map', component: MapComponent
  },
  {
    path: 'report', component: OutageReportComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AutoCompleteModule
  ],
  declarations: [],
  exports: [RouterModule]
})
export class MapRoutingModule { }
