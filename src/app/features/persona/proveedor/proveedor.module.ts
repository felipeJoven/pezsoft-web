import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedorListComponent } from './pages/proveedor-list.component';
import { ProveedorFormComponent } from './components/proveedor-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProveedorRoutingModule } from './proveedor-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { SoloNumerosDirective } from '../../../shared/directives/solo-numeros.directive';
import { SoloLetrasDirective } from '../../../shared/directives/solo-letras.directive';

@NgModule({
  declarations: [
    ProveedorListComponent,
    ProveedorFormComponent,
    SoloLetrasDirective,
    SoloNumerosDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProveedorRoutingModule,
    SharedModule
  ]
})
export class ProveedorModule { }
