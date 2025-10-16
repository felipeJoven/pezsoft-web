import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';

import { ModalComponent } from './ui/modal/modal.component';
import { BtnAgregarComponent } from './ui/buttons/btn-agregar/btn-agregar.component';
import { BtnEditarComponent } from './ui/buttons/btn-editar/btn-editar.component';
import { BtnEliminarComponent } from './ui/buttons/btn-eliminar/btn-eliminar.component';
import { FiltroBusquedaComponent } from './ui/filters/filtro-busqueda/filtro-busqueda.component';
import { FiltroOrdenComponent } from './ui/filters/filtro-orden/filtro-orden.component';

@NgModule({
  declarations: [
    ModalComponent,
    BtnAgregarComponent,
    BtnEditarComponent,
    BtnEliminarComponent,
    FiltroBusquedaComponent,
    FiltroOrdenComponent
  ],
  imports: [ 
    CommonModule, 
    ReactiveFormsModule
   ],
  exports: [
    ModalComponent,
    BtnAgregarComponent,
    BtnEditarComponent,
    BtnEliminarComponent,
    FiltroBusquedaComponent,
    FiltroOrdenComponent
  ]
})
export class SharedModule {}
