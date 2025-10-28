import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstanqueRoutingModule } from './estanque-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { ComaDecimalPipe } from '../../../shared/pipes/coma-decimal.pipe';
import { SeparadorDecimalesDirective } from '../../../shared/directives/separador-decimales.directive';

import { EstanqueListComponent } from './pages/estanque-list.component';
import { EstanqueFormComponent } from './components/estanque-form.component';

@NgModule({
  declarations: [
    EstanqueListComponent,
    EstanqueFormComponent,
    ComaDecimalPipe,
    SeparadorDecimalesDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    EstanqueRoutingModule
  ]
})
export class EstanqueModule { }
