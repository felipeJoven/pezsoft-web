import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspecieRoutingModule } from './especie-routing.module';
import { EspecieListComponent } from './pages/especie-list.component';
import { EspecieFormComponent } from './components/especie-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [
    EspecieListComponent,
    EspecieFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EspecieRoutingModule,
    SharedModule,
    SkeletonModule
  ]
})
export class EspecieModule { }
