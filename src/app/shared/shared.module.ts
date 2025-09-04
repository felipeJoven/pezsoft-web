import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppModalComponent } from './ui/modal/app-modal.component';
import { BtnAgregarComponent } from './ui/buttons/btn-agregar/btn-agregar.component';
import { BtnEditarComponent } from './ui/buttons/btn-editar/btn-editar.component';
import { BtnEliminarComponent } from './ui/buttons/btn-eliminar/btn-eliminar.component';


@NgModule({
  declarations: [
    AppModalComponent,
    BtnAgregarComponent,
    BtnEditarComponent,
    BtnEliminarComponent
  ],
  imports: [ CommonModule ],
  exports: [
    AppModalComponent,
    BtnAgregarComponent,
    BtnEditarComponent,
    BtnEliminarComponent
  ]
})
export class SharedModule {}
