import { Routes } from '@angular/router';
import { SupportCenterComponent } from 'src/app/features/support-center/support-center.component';

export const FeatureRoute: Routes = [
  { path: 'outage', loadChildren: 'src/app/features/maps/map.module#MapModule'},
  { path: 'support-center', component: SupportCenterComponent, pathMatch:'full'}
];
