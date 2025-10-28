import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EspecieRoutingModule } from './especie-routing.module';
import { SharedModule } from '../../../shared/shared.module';

import { EspecieListComponent } from './pages/especie-list.component';
import { EspecieFormComponent } from './components/especie-form.component';

@NgModule({
  declarations: [
    EspecieListComponent,
    EspecieFormComponent  
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EspecieRoutingModule,
    SharedModule
  ]
})
export class EspecieModule { }
