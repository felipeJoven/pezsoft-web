import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'proveedor',
    loadChildren: () =>
      import('./proveedor/proveedor.module').then(m => m.ProveedorModule)
  }
 /*  {
    path: 'cliente',
    loadChildren: () =>
      import('./cliente/cliente.module').then(m => m.ClienteModule)
  } */

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonaRoutingModule { }
