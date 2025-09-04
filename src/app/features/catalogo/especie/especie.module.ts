import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspecieRoutingModule } from './especie-routing.module';
import { EspecieListComponent } from './pages/especie-list.component';
import { EspecieFormComponent } from './components/especie-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    EspecieListComponent,
    EspecieFormComponent
  ],
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    EspecieRoutingModule,
    SharedModule   
  ]
})
export class EspecieModule { }
