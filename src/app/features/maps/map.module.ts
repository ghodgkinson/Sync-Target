import { NgModule } from '@angular/core';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { SharedModule } from 'src/app/core/shared/modules/shared.modules';
import { MapComponent } from './map.component';
import { MapRoutingModule } from './map-routing.module';
import { AgmCoreModule } from '@agm/core';
import { OutageReportComponent } from '../reports/outage.report.component';

@NgModule({
    declarations: [
       MapComponent,
       OutageReportComponent 
    ],
    imports: [
        SharedModule,
        AutoCompleteModule,
        MapRoutingModule
    ],
    providers: [],
    exports: []
})
export class MapModule { }
