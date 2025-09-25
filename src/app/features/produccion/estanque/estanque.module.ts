import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstanqueRoutingModule } from './estanque-routing.module';
import { EstanqueListComponent } from './pages/estanque-list.component';
import { EstanqueFormComponent } from './components/estanque-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { ComaDecimalPipe } from '../../../shared/pipes/coma-decimal.pipe';
import { SeparadorDecimalesDirective } from '../../../shared/directives/separador-decimales.directive';


@NgModule({
  declarations: [
    EstanqueListComponent,
    EstanqueFormComponent,
    ComaDecimalPipe,
    SeparadorDecimalesDirective
  ],
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    EstanqueRoutingModule,
    SharedModule
  ]
})
export class EstanqueModule { }
