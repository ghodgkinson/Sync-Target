import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { CarouselModule} from 'primeng/carousel';

import { SpinnerComponent } from '../../spinner/spinner.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

import config from '../../../../config/default.json';
const googleMapApiKey = config['google-map-api'].key;

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule, FormsModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: googleMapApiKey
    }),
    CarouselModule
  ],
  declarations: [
    SpinnerComponent,
    HeaderComponent,
    FooterComponent
  ],
  entryComponents: [],
  exports: [
    CommonModule,
    ReactiveFormsModule, FormsModule,
    RouterModule,
    AgmCoreModule,
    SpinnerComponent,
    HeaderComponent,
    FooterComponent
  ],
  providers: [

  ]
})
export class SharedModule {
}
