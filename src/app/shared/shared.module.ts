import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ModalComponent } from './ui/modal/modal.component';
import { BtnAgregarComponent } from './ui/buttons/btn-agregar/btn-agregar.component';
import { BtnEditarComponent } from './ui/buttons/btn-editar/btn-editar.component';
import { BtnEliminarComponent } from './ui/buttons/btn-eliminar/btn-eliminar.component';
import { FiltroBusquedaComponent } from './ui/filters/filtro-busqueda/filtro-busqueda.component';
import { FiltroOrdenComponent } from './ui/filters/filtro-orden/filtro-orden.component';
import { BtnLimpiarComponent } from './ui/buttons/btn-limpiar/btn-limpiar.component';
import { PaginadorComponent } from './ui/paginator/paginador.component';


@NgModule({
  declarations: [
    ModalComponent,
    BtnAgregarComponent,
    BtnEditarComponent,
    BtnEliminarComponent,
    FiltroBusquedaComponent,
    FiltroOrdenComponent,
    BtnLimpiarComponent,
    PaginadorComponent
  ],
  imports: [ 
    CommonModule, 
    ReactiveFormsModule,
   ],
  exports: [
    ModalComponent,
    BtnAgregarComponent,
    BtnEditarComponent,
    BtnEliminarComponent,
    FiltroBusquedaComponent,
    FiltroOrdenComponent,
    BtnLimpiarComponent,
    PaginadorComponent
  ]
})
export class SharedModule {}
