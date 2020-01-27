import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../core/shared/modules/shared.modules';
import { MapModule } from './maps/map.module';
import { SupportCenterComponent } from './support-center/support-center.component';

@NgModule({
  imports: [
    SharedModule,
    MapModule,
    RouterModule,
    CommonModule
  ],
  declarations: [SupportCenterComponent],
  exports: [],
  providers: [],
})
export class FeatureModule { }